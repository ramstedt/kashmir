import useCart from "../../../hooks/useCart";
import { TbSeedingOff, TbEgg } from "react-icons/tb";
import { RiLeafFill } from "react-icons/ri";
import { GiPeanut } from "react-icons/gi";

export default function CartInfo() {
  const { cart, total } = useCart();
  return (
    <>
      {cart.map((item) => {
        return (
          <div key={item.id}>
            <div className="flex justify-between">
              <div>{item.name}</div>
              <div>{item.price * item.qty} kr</div>
            </div>
            <div className="flex justify-start">
              <div>{item.is_gluten_free ? <TbSeedingOff /> : ""}</div>
              <div> {item.is_vegan ? <RiLeafFill /> : ""}</div>
              <div> {item.is_vegetarian ? <TbEgg /> : ""}</div>
              <div> {item.contains_nuts ? <GiPeanut /> : ""}</div>
            </div>

            <div className="flex justify-end">
              <button>-</button> {item.qty} +
            </div>
          </div>
        );
      })}
    </>
  );
}
