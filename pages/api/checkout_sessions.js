const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const lineItems = {
  price_data: {
    currency: "sek",
    product_data: {
      name: "name",
    },
    unit_amount: "200",
  },
  quantity: "3",
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        // line_items: [
        //   {
        //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //     //"The `price` parameter should be the ID of a price object, rather than the literal
        //     //numerical price. Please see https://stripe.com/docs/billing/prices-guide#create-prices
        //     //for more information about how to set up price objects."
        //     price: "234",
        //     quantity: 1,
        //   },
        // ],
        line_items: [lineItems],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
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

// this was in checkout page:

// const processPayment = async () => {
//     const url = "./api/create-stripe-session";
//     const newCart = cart.map(({ id, qty }) => ({
//       id,
//       qty,
//     }));

//     const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
//     const { data } = await axios.post(url, { cart: newCart });
//     await stripe.redirectToCheckout({ sessionId: data.id });
//   };
