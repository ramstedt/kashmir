import User from "../components/user/User";
import CartInfo from "../components/consumerView/cart/CartInfo";
import useCart from "../hooks/useCart";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Auth from "../components/auth/Auth";
import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
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

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  //check if logged in
  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
      }
      setLoading(false);
    }
    getInitialSession();
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      {!session ? (
        <Auth />
      ) : (
        <>
          <h1>checkout</h1>
          <p>you are signed in as</p>
          {console.log(session)}
          <User email={session.user.email} />
          {cart.length > 0 ? (
            <>
              <CartInfo />
              <form action="/api/checkout_sessions" method="POST">
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
