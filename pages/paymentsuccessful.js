import useCart from "../hooks/useCart";
import { useEffect } from "react";

export default function PaymentSuccessful() {
  const { emptyCart } = useCart();
  useEffect(() => {
    emptyCart();
  }, []);
  return (
    <>
      <div>payment was successful</div>
    </>
  );
}
