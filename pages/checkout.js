import CartInfo from "../components/consumerView/cart/CartInfo";
import useCart from "../hooks/useCart";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import axios from "axios";

export default function Checkout({ session }) {
  const { cart, total } = useCart();

  const handleCheckout = async () => {
    axios.post("api/checkout_sessions", {
      user_id: session.user.id,
      user_email: session.user.email,
    });
  };

  return (
    <>
      <>
        <h1>checkout</h1>
        {/* {console.log(cart)} */}

        {cart.length > 0 ? (
          <>
            <CartInfo />
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button type="submit">Checkout</button>
              </section>
            </form>
            <button onClick={handleCheckout}>TEST</button>
          </>
        ) : (
          <p>
            Your order is currently empty. Please browse the menu and add
            something to your order.
          </p>
        )}
      </>
    </>
  );
}
