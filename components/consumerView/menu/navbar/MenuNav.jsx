import Popup from "reactjs-popup";
import { useRef, useState, useEffect } from "react";
import MenuButton from "./MenuButton";
import Cart from "../../cart/Cart";
import { supabase } from "../../../../utils/supabase";

export default function MenuNav({ session }) {
  const ref = useRef();
  const closeMenu = () => ref.current.close();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchCartCount = async () => {
    try {
      setLoading(true);
      let { data: cart, error } = await supabase
        .from("cart")
        .select("quantity")
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

  const setupCartCount = async () => {
    const cartcounter = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cart",
        },
        () => {
          fetchCartCount();
          console.log("change detected");
        }
      )
      .subscribe();
  };

  useEffect(() => {
    fetchCartCount();
    setupCartCount();
  }, []);
  // let qty = cart.reduce((accumulator, object) => {
  //   return accumulator + object.quantity;
  // }, 0);
  // setQuantity(qty);
  console.log(cart);
  // cart.map((qty) => {
  //   console.log(qty);
  // });
  return (
    <nav className="sticky bottom-0 w-full bg-cobalt text-white font-MulishBold h-14 rounded-t-md">
      <ul className="flex h-full justify-around items-center content-center text-center">
        {/* <li className="w-[50%] h-full flex items-center justify-center">
           <Popup
            trigger={
              <div className="menu-item w-[50%] flex h-full items-center justify-center text-center">
                <button className="h-full w-full hover:bg-spaceCadet">
                  Menu
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
              <form className="">
                <div className="mr-2">Select one or more</div>
                <div className="flex flex-wrap items-center content-center">
                  <MenuButton text="Starters" value="starters"></MenuButton>
                  <MenuButton text="Mains" value="mains"></MenuButton>
                  <MenuButton text="Desserts" value="desserts"></MenuButton>
                  <MenuButton text="Drinks" value="drinks"></MenuButton>
                </div>
                Allergens
                <div className="flex flex-wrap">
                  <MenuButton text="Vegetarian" value="vegetarian"></MenuButton>
                  <MenuButton text="Vegan" value="vegan"></MenuButton>
                  <MenuButton
                    text="Gluten free"
                    value="glutenFree"
                  ></MenuButton>
                  <MenuButton text="No nuts" value="noNuts"></MenuButton>
                </div>
                <div className="flex justify-center">
                  <button className="border-solid border-2 border-cobalt hover:bg-spaceCadet text-white px-2 py-2 mx-1 rounded-2xl w-fit">
                    Sort
                  </button>
                </div>
              </form>
              <div
                className="fixed p-2 top-0 right-0 cursor-pointer"
                onClick={closeMenu}
              >
                <span className="m-2 text-xl">X</span>
              </div>
            </div>
          </Popup> 
          </li> */}
        <li className="w-full h-full flex items-center justify-center">
          <Popup
            trigger={
              <div className="menu-item w-[50%] flex h-full items-center justify-center text-center">
                <button className="h-full w-full">
                  Your order ({quantity})
                </button>
              </div>
            }
            position="top"
            on="click"
            ref={ref}
            contentStyle={{ padding: "0px", border: "none" }}
            arrow={true}
          >
            <div className="fixed w-full h-full bg-cultured top-0 left-0 p-5 pt-10">
              <div className="fixed p-2 top-0 right-0" onClick={closeMenu}>
                <span className="m-2 text-xl">X</span>
              </div>

              <Cart session={session} />
            </div>
          </Popup>
        </li>
      </ul>
    </nav>
  );
}
