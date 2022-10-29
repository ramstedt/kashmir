import CartInfo from "../components/consumerView/cart/CartInfo";

export default function Checkout({ session }) {
  return (
    <>
      <>
        <h1>checkout</h1>

        <>
          <CartInfo />
          <form action="/api/checkout_sessions" method="POST">
            {/* if the user manipulates the user ID then the POST will fail. The
            email is only passed to pre-fill the stripe checkout email field. */}
            <input
              type="hidden"
              id="user_email"
              name="user_email"
              value={session.user.email}
            />
            <input
              type="hidden"
              id="user_id"
              name="user_id"
              value={session.user.id}
            />
            <section>
              <button type="submit">Checkout</button>
            </section>
          </form>
        </>
      </>
    </>
  );
}
