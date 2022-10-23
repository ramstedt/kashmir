const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession() {
  const cartWithProducts = cart.map(({ id, qty }) => {
    const product = products.find((p) => p.id === id);
    return {
      ...product,
      qty,
    };
  });

  const lineItems = cartWithProducts.map((product) => ({
    price_data: {
      currency: "sek",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price,
    },
    quantity: product.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.URL}/paymentsuccessful`,
    cancel_url: `${process.env.URL}/paymentcancelled`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  };
}

export default CreateStripeSession;
