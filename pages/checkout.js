import useCart from "../hooks/useCart";

export default function Checkout() {
  const { cart } = useCart();
  return (
    <>
      <h1>checkout</h1>
      {cart.lenght > 0 ? (
        <p>has items</p>
      ) : (
        <p>
          Your order is currently empty. Please browse the menu and add
          something to your order.
        </p>
      )}
    </>
  );
}
