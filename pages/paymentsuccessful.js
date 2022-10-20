import useCart from "../hooks/useCart";
import { useEffect } from "react";

export default function Paymentsuccessful() {
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
