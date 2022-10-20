import CartInfo from "../components/consumerView/cart/CartInfo";
import useCart from "../hooks/useCart";

export default function Checkout() {
  const { cart } = useCart();
  console.log("hej");
  console.log(cart);
  return (
    <>
      <h1>checkout</h1>
      {cart.length > 0 ? (
        <CartInfo />
      ) : (
        <p>
          Your order is currently empty. Please browse the menu and add
          something to your order.
        </p>
      )}
    </>
  );
}
