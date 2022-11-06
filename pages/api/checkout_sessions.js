import { supabaseServerClient } from "../../utils/supabaseServerClient";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    //fetch the users email and ID
    const { user_email, user_id, table, extraInfo } = req.body;

    if (!user_email || !user_id) {
      return res.status(400).json({
        message: "missing user email or user id",
      });
    }
    //get the cart items from the cart
    const { data: cartItems, error: cartItemsFetchError } =
      await supabaseServerClient
        .from("cart")
        .select(`quantity, menuitem(id, name, description, price, stock)`)
        .eq("user_id", user_id);

    if (cartItemsFetchError) {
      return res.status(500).json({
        message: "Error fetching cart items",
      });
    }

    //create an order
    const { data: order, error: orderCreationError } =
      await supabaseServerClient
        .from("order")
        .insert([
          {
            user_id: user_id,
            table: table,
            extra_info: extraInfo,
          },
        ])
        .select();

    if (orderCreationError) {
      return res.status(500).json({
        message: orderCreationError.message,
      });
    }

    const order_id = order[0].id;

    const orderItemsFromCartitems = cartItems.map((cartItem) => ({
      order_id: order_id,
      menuitem_id: cartItem.menuitem.id,
      quantity: cartItem.quantity,
      user_id: user_id,
    }));

    //insert cart items as order items with the new order id
    const { data: order_items, error: orderItemsInsertionError } =
      await supabaseServerClient
        .from("orderitem")
        .insert(orderItemsFromCartitems);

    if (orderItemsInsertionError) {
      return res.status(500).json({
        message: "error inserting order items",
      });
    }
    //create line items for stripe
    const line_items = cartItems.map((cartItem) => ({
      price_data: {
        currency: "sek",
        product_data: {
          name: cartItem.menuitem.name,
          description: cartItem.menuitem.description,
        },
        unit_amount: cartItem.menuitem.price * 100,
      },
      quantity: cartItem.quantity,
    }));

    try {
      // Create Checkout Sessions
      const session = await stripe.checkout.sessions.create({
        customer_email: user_email,
        line_items,
        mode: "payment",
        payment_method_types: ["klarna", "card"],
        success_url: `${req.headers.origin}/paymentsuccessful`,
        cancel_url: `${req.headers.origin}/paymentcancelled`,
        payment_intent_data: {
          metadata: {
            order_id,
          },
        },
      });

      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
