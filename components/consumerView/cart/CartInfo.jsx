import { supabase } from "../../../utils/supabase";
import { useState, useEffect } from "react";
import { TbEgg, TbSeedingOff } from "react-icons/tb";
import { RiLeafFill } from "react-icons/ri";
import { GiPeanut } from "react-icons/gi";

export default function CartInfo() {
  const [cart, setCart] = useState([]);
  let total = 0;
  const [loading, setLoading] = useState(false);
  const fetchCart = async () => {
    try {
      setLoading(true);
      let { data: cart, error } = await supabase
        .from("cart")
        .select(
          `quantity, menuitem(id, name, description, price, is_gluten_free, is_vegan, is_vegetarian, contains_nuts)`
        );
      if (cart) {
        setCart(cart);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <>
      {cart?.map((item, key) => {
        return (
          <div key={key}>
            <div className="flex justify-between">
              <div>{item.menuitem.name}</div>
              <div>{item.menuitem.price * item.quantity} kr</div>
            </div>
            <div className="flex justify-start">
              <div>{item.menuitem.is_gluten_free ? <TbSeedingOff /> : ""}</div>
              <div> {item.menuitem.is_vegan ? <RiLeafFill /> : ""}</div>
              <div> {item.menuitem.is_vegetarian ? <TbEgg /> : ""}</div>
              <div> {item.menuitem.contains_nuts ? <GiPeanut /> : ""}</div>
            </div>

            <div className="flex justify-end">
              <button>+-</button>
            </div>
          </div>
        );
      })}
      {cart.map((price) => {
        total = total + price.menuitem.price * price.quantity;
      })}
      TOTAL: {total} kr
    </>
  );
}
