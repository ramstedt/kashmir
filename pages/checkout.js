import User from "../components/user/User";
import CartInfo from "../components/consumerView/cart/CartInfo";
import useCart from "../hooks/useCart";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Auth from "../components/auth/Auth";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
  const { cart, total } = useCart();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <>
      {!session ? (
        <Auth />
      ) : (
        <>
          <h1>checkout</h1>
          <p>you are signed in as</p>
          {console.log(cart)}
          <User session={session} />
          {cart.length > 0 ? (
            <>
              <CartInfo />
              <form action="/api/checkout_sessions" method="POST">
                {cart.map((item) => {
                  return (
                    <input
                      type="hidden"
                      key={item.id}
                      name={item.id}
                      value={item.id}
                    />
                  );
                })}
                <section>
                  <button type="submit" role="link">
                    Checkout
                  </button>
                </section>
              </form>
            </>
          ) : (
            <p>
              Your order is currently empty. Please browse the menu and add
              something to your order.
            </p>
          )}
        </>
      )}
    </>
  );
}
