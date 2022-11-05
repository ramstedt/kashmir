import Image from "next/image";
import Popup from "reactjs-popup";
import { supabase } from "../../../utils/supabase";

async function addToCart(prodId, session) {
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
  productId,
  session,
  image,
}) {
  return (
    <div suppressHydrationWarning={true}>
      <Popup
        trigger={
          <div className="w-full h-[120px] bg-white rounded-xl shadow-lg mb-4 cursor-pointer">
            <div className="flex w-full h-full p-2.5">
              <div className="mr-1 relative w-[100px] h-[100px]">
                <Image
                  src={image}
                  layout="fill"
                  objectFit="cover"
                  alt={`a photo of ${title}`}
                />
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
              <div className="max-w-[800px] m-auto">
                <div className="max-w-[800px] h-[400px] bg-black relative">
                  <Image
                    src={image}
                    className="w-full"
                    layout="fill"
                    objectFit="cover"
                    alt={`a photo of ${title}`}
                  />
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
                    onClick={() => addToCart(productId, session)}
                    className="bg-spaceCadet text-white border-solid border-2 border-spaceCadet px-2 py-2 rounded-2xl"
                  >
                    Add to order
                  </button>
                </div>
                <div className="mt-5"></div>
              </div>
            </div>
            <div
              className=" flex justify-center p-2 cursor-pointer"
              onClick={close}
            >
              <button className="m-2 text-xl">X</button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
