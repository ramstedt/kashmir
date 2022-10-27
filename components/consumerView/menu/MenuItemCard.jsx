import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import Popup from "reactjs-popup";
import { supabase } from "../../../utils/supabase";

async function addToSupaCart(prodId, session) {
  // check if item already exists in cart
  const { data: cartitems } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("menuitem_id", prodId);

  if (!cartitems[0] || 0) {
    //add item to cart
    const { data, error } = await supabase
      .from("cart")
      .insert(
        [{ menuitem_id: prodId, quantity: 1, user_id: session.user.id }],
        {
          upsert: true,
        }
      );
  } else {
    //update item quantity
    const { data, error } = await supabase
      .from("cart")
      .update({ quantity: cartitems[0].quantity + 1 })
      .eq("user_id", session.user.id)
      .eq("menuitem_id", prodId);
  }
}

export default function FoodItemCard({
  title,
  price,
  description,
  vegan,
  vegetarian,
  glutenFree,
  nuts,
  addToCart,
  productId,
  session,
}) {
  return (
    <div suppressHydrationWarning={true}>
      <Popup
        trigger={
          <div className="w-full h-[120px] bg-white rounded-xl shadow-lg mb-4 cursor-pointer">
            <div className="flex w-full h-full p-2.5">
              <div className="">
                <Image src={Logo} width="100px" height="100px" />
              </div>
              <div>
                <h2 className="menuItem">{title}</h2>
                <h5>
                  {vegan} {vegetarian} {nuts} {glutenFree}
                </h5>
                <h4>{price} kr</h4>
              </div>
            </div>
          </div>
        }
        modal
        nested
      >
        {(close) => (
          <div className="bg-cultured h-screen w-screen">
            <div className="mx-[6%]">
              <button className="close" onClick={close}>
                X
              </button>
              <div className="max-w-[800px] m-auto">
                <div className="w-full h-[400px]">
                  <Image src={Logo} />
                </div>
                <div className="flex items-end justify-between">
                  <h6 className="menuItem">{title}</h6>
                  <h3>{price} kr</h3>
                </div>
                <div className="menuItem">{description}</div>
                <div className="text-pumpkin my-3">
                  {vegan} {vegetarian} {nuts} {glutenFree}
                </div>
                <div className="flex justify-start mt-10">
                  <button
                    onClick={addToCart}
                    className="bg-spaceCadet text-white border-solid border-2 border-spaceCadet px-2 py-2 rounded-2xl"
                  >
                    Add to order
                  </button>
                  <button
                    onClick={() => addToSupaCart(productId, session)}
                    className="bg-spaceCadet text-white border-solid border-2 border-spaceCadet px-2 py-2 rounded-2xl"
                  >
                    Supacart
                  </button>
                </div>
                <div className="mt-5"></div>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
