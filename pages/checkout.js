import CartInfo from "../components/consumerView/cart/CartInfo";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";
import axios from "axios";

export default function Checkout({ session }) {
  const handleCheckout = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const url = "api/checkout_sessions";

    const data = {
      user_id: session.user.id,
      user_email: session.user.email,
    };

    axios
      .post(url, data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <>
        <h1>checkout</h1>

        <>
          <CartInfo />
          <form action="/api/checkout_sessions" method="POST">
            <section>
              <button type="submit">Checkout</button>
            </section>
          </form>
          <button onClick={handleCheckout}>TEST</button>
        </>
      </>
    </>
  );
}
