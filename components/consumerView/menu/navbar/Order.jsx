import Popup from "reactjs-popup";
import { useRef, useState, useEffect } from "react";
import { supabase } from "../../../../utils/supabase";
import { TbEgg, TbSeedingOff } from "react-icons/tb";
import { RiLeafFill } from "react-icons/ri";
import { GiPeanut } from "react-icons/gi";
import Button from "../../../button/Button";
import AllergyLegend from "../allergyLegend/AllergyLegend";
import OrderHistory from "./OrderHistory";

export default function MenuNav({ session }) {
  const ref = useRef();
  const closeMenu = () => ref.current.close();
  let total = 0;
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState("");

  //collect cart info
  const fetchCart = async () => {
    try {
      setLoading(true);
      let { data: cart, error } = await supabase
        .from("cart")
        .select(
          `quantity, menuitem(id, name, description, price, is_gluten_free, is_vegan, is_vegetarian, contains_nuts)`
        )
        .order("created_at")
        .eq("user_id", session.user.id);

      if (cart) {
        setCart(cart);
        let qty = cart.reduce((accumulator, object) => {
          return accumulator + object.quantity;
        }, 0);
        setQuantity(qty);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //decrease the item quantity
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
  };

  //increase the item quantity
  const incrementQuantity = async (item) => {
    //update item quantity by 1
    const { data, error } = await supabase
      .from("cart")
      .update({ quantity: item.quantity + 1 })
      .eq("user_id", session.user.id)
      .eq("menuitem_id", item.menuitem.id);
  };

  //subscribe to cart changes
  const setupCartCount = async () => {
    const cartcounter = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cart",
          filter: `user_id=eq.${session.user.id}`,
        },
        () => {
          fetchCart();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    fetchCart();
    setupCartCount();
  }, []);

  return (
    <nav className="sticky bottom-0 w-full bg-cobalt text-white font-MulishBold h-14 rounded-t-md">
      <ul className="flex h-full justify-around items-center content-center text-center">
        <li className="w-[50%] h-full flex items-center justify-center">
          <Popup
            trigger={
              <div className="menu-item w-[50%] flex h-full items-center justify-center text-center">
                <button className="h-full w-full hover:bg-spaceCadet">
                  Orders
                </button>
              </div>
            }
            position="top"
            on="click"
            ref={ref}
            contentStyle={{ padding: "0px", border: "none" }}
            arrow={true}
          >
            <div className="fixed w-full h-full bg-cultured top-0 left-0 p-10">
              <div className="fixed p-2 top-0 right-0" onClick={closeMenu}>
                <span className="m-2 text-xl">X</span>
              </div>
              <OrderHistory session={session} />
            </div>
          </Popup>
        </li>
        <li className="w-[50%] h-full flex items-center justify-center">
          <Popup
            trigger={
              <div className="menu-item w-[50%] flex h-full items-center justify-center text-center">
                <button className="h-full w-full">Cart ({quantity})</button>
              </div>
            }
            position="top"
            on="click"
            ref={ref}
            contentStyle={{
              padding: "0px",
              border: "none",
              maxHeight: "100vh",
              overflowY: "auto",
            }}
            arrow={true}
          >
            <div className="fixed w-full h-full bg-cultured top-0 left-0 p-5 pt-10">
              <div className="fixed p-2 top-0 right-0" onClick={closeMenu}>
                <span className="m-2 text-xl">X</span>
              </div>

              <div className="max-w-xl m-auto">
                {cart?.map((item, key) => {
                  return (
                    <div key={key} className="my-2 border-b-2">
                      <div className="flex justify-between">
                        <div className="menuItem">{item.menuitem.name}</div>
                        <div>
                          {item.quantity} x {item.menuitem.price} kr
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex">
                          <div>
                            {item.menuitem.is_gluten_free ? (
                              <TbSeedingOff />
                            ) : (
                              ""
                            )}
                          </div>
                          <div>
                            {" "}
                            {item.menuitem.is_vegan ? <RiLeafFill /> : ""}
                          </div>
                          <div>
                            {" "}
                            {item.menuitem.is_vegetarian ? <TbEgg /> : ""}
                          </div>
                          <div>
                            {" "}
                            {item.menuitem.contains_nuts ? <GiPeanut /> : ""}
                          </div>
                        </div>
                        <div>
                          <button onClick={() => incrementQuantity(item)}>
                            <span className="mr-4">+</span>
                          </button>
                          {item.quantity < 1 ? (
                            ""
                          ) : (
                            <button onClick={() => decrementQuantity(item)}>
                              -
                            </button>
                          )}
                        </div>
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
                      <label htmlFor="table">Your table number</label>
                      <input type="number" id="table" name="table" required />
                    </div>
                    <div className="mb-8 text-center flex flex-col min-w-full">
                      <label htmlFor="extra_info">
                        Extra instructions (optional)
                      </label>
                      <textarea
                        id="extraInfo"
                        name="extraInfo"
                        rows="5"
                        cols="10"
                      />
                    </div>
                  </div>
                  <Button type="submit" text="Place order" />
                </form>
              </div>
            </div>
          </Popup>
        </li>
      </ul>
    </nav>
  );
}
