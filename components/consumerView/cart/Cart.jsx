import { supabase } from "../../../utils/supabase";
import { useState, useEffect, useReducer } from "react";
import { TbEgg, TbSeedingOff } from "react-icons/tb";
import { RiLeafFill } from "react-icons/ri";
import { GiPeanut } from "react-icons/gi";
import Button from "../../button/Button";
import AllergyLegend from "../menu/allergyLegend/AllergyLegend";

export default function Cart({ session }) {
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
        )
        .order("created_at");
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

  const incrementQuantity = async (item) => {
    //update item quantity by 1
    const { data, error } = await supabase
      .from("cart")
      .update({ quantity: item.quantity + 1 })
      .eq("user_id", session.user.id)
      .eq("menuitem_id", item.menuitem.id);
    //fetch new cart values
    let { data: cart } = await supabase
      .from("cart")
      .select(
        `quantity, menuitem(id, name, description, price, is_gluten_free, is_vegan, is_vegetarian, contains_nuts)`
      )
      .order("created_at");

    setCart(cart);
  };

  const decrementQuantity = async (item) => {
    //if current quantity is 1, delete the item from table
    if (item.quantity === 1) {
      const { data, error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", session.user.id)
        .eq("menuitem_id", item.menuitem.id);
    } else {
      const { data, error } = await supabase
        .from("cart")
        .update({ quantity: item.quantity - 1 })
        .eq("user_id", session.user.id)
        .eq("menuitem_id", item.menuitem.id);
    }

    //fetch new cart values
    let { data: cart } = await supabase
      .from("cart")
      .select(
        `quantity, menuitem(id, name, description, price, is_gluten_free, is_vegan, is_vegetarian, contains_nuts)`
      )
      .order("created_at");

    setCart(cart);
  };

  return (
    <div className="max-w-xl m-auto">
      {cart?.map((item, key) => {
        return (
          <div key={key}>
            <div className="flex justify-between">
              <div className="menuItem">{item.menuitem.name}</div>
              <div>
                {item.quantity} x {item.menuitem.price} kr
              </div>
            </div>
            <div className="flex justify-start">
              <div>{item.menuitem.is_gluten_free ? <TbSeedingOff /> : ""}</div>
              <div> {item.menuitem.is_vegan ? <RiLeafFill /> : ""}</div>
              <div> {item.menuitem.is_vegetarian ? <TbEgg /> : ""}</div>
              <div> {item.menuitem.contains_nuts ? <GiPeanut /> : ""}</div>
            </div>
            {item.quantity}
            <div className="flex justify-end">
              <button onClick={() => incrementQuantity(item)}>+</button>
              {item.quantity < 1 ? (
                ""
              ) : (
                <button onClick={() => decrementQuantity(item)}>-</button>
              )}
            </div>
          </div>
        );
      })}
      <div className="flex flex-col items-center">
        <AllergyLegend />
        {cart?.map((item) => {
          total = total + item.menuitem.price * item.quantity;
        })}
        <div className="my-4 font-MulishBold">TOTAL: {total} kr</div>
      </div>
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
        <div className="flex flex-col items-center max-w-[600px]">
          <div className="text-center flex flex-col min-w-full">
            <label htmlfor="table">Your table number</label>
            <input type="number" id="table" name="table" required />
          </div>
          <div className="mb-8 text-center flex flex-col min-w-full">
            <label htmlfor="extra_info">Extra instructions (optional)</label>
            <textarea id="extraInfo" name="extraInfo" rows="5" cols="10" />
          </div>
        </div>
        <Button type="submit" text="Place order" />
      </form>
    </div>
  );
}
