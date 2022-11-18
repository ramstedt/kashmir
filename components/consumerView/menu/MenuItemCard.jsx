import Image from "next/image";
import Popup from "reactjs-popup";
import { supabase } from "../../../utils/supabase";
import { useState } from "react";
import Shoppingbasket from "../../../public/icons/shopping-basket.gif";
import Spinner from "../../../public/icons/spinner.svg";
import Button from "../../button/Button";

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
  admin,
}) {
  const [addConfirm, setAddConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function addToCart(prodId, session) {
    setLoading(true);
    // check if item already exists in cart
    const { data: cartitems } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", session.user.id)
      .eq("menuitem_id", prodId);

    if (!cartitems[0]) {
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
    //fedback to user
    setAddConfirm(true);
    setLoading(false);
    await delay(1500);
    setAddConfirm(false);
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
                  alt={`a photo of ${description}`}
                  className="rounded"
                />
              </div>
              <div className="ml-3 flex flex-col justify-center">
                <h2 className="menuItem">{title}</h2>
                <div className="flex">
                  {vegan} {vegetarian} {nuts} {glutenFree}
                </div>
                <h4>{price} kr</h4>
              </div>
            </div>
          </div>
        }
        modal
        nested
      >
        {(close) => (
          <div className="flex flex-col h-screen">
            <div
              className="bg-black bg-opacity-70 relative top-0 h-[80px] w-screen flex justify-end items-start"
              onClick={close}
            >
              <button aria-label="close">
                <span className="text-white text-xl mr-2" onClick={close}>
                  X
                </span>
              </button>
            </div>
            <div className="bg-cultured w-screen h-full">
              <div className="max-w-[800px] h-[300px] relative left-[50%] transform translate-x-[-50%] mb-2">
                <Image
                  src={image}
                  className="w-full"
                  layout="fill"
                  objectFit="cover"
                  alt={`a photo of ${description}`}
                />
              </div>
              <div className="mx-[6%]">
                <div className="max-w-[800px] m-auto">
                  <div className="flex items-end justify-between content-center">
                    <h6 className="menuItem">{title}</h6>
                    <h4 className="text-[18px]">{price} kr</h4>
                  </div>
                  <div className="menuItem">{description}</div>
                  <div className="my-3 flex">
                    {vegan} {vegetarian} {nuts} {glutenFree}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex justify-start mt-10">
                      <button
                        onClick={() => addToCart(productId, session)}
                        className="bg-spaceCadet text-white border-solid border-2 border-spaceCadet px-2 py-2 rounded-2xl w-[150px]"
                      >
                        {loading ? (
                          <Image
                            src={Spinner}
                            alt="loading"
                            height="19"
                            width="19"
                          />
                        ) : !addConfirm ? (
                          "Add to order"
                        ) : (
                          "Added"
                        )}
                      </button>
                      {!addConfirm ? (
                        ""
                      ) : (
                        <div className="flex items-center bg-white w-fit rounded">
                          <span className="text-center">
                            <Image
                              src={Shoppingbasket}
                              alt="animated icon showing a shopping basket with food bouncing inside"
                              width="40"
                              height="40"
                            />
                          </span>
                        </div>
                      )}
                    </div>
                    {admin ? (
                      ""
                    ) : (
                      <div className="mt-2 border rounded w-fit p-2 bg-white">
                        <h2>Admin options</h2>
                        <div className="flex flex-col">
                          <button>Update</button>
                          <button>Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-black bg-opacity-50 relative top-0 h-[80px] w-screen"
              onClick={close}
            ></div>
          </div>
        )}
      </Popup>
    </div>
  );
}
