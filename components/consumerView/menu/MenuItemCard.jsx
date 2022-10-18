import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import Popup from "reactjs-popup";
import { useState } from "react";

export default function FoodItemCard({
  title,
  price,
  description,
  vegan,
  vegetarian,
  glutenFree,
  nuts,
  addToCart,
}) {
  let [count, setCount] = useState(1);
  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    if (count <= 0) {
      count = 0;
    }
    setCount(count);
  }
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
                <h2>{title}</h2>
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
                  <h6>{title}</h6>
                  <h3>{price} kr</h3>
                </div>
                <div>{description}</div>
                <div className="text-pumpkin my-3">
                  {vegan} {vegetarian} {nuts} {glutenFree}
                </div>
                <div className="flex justify-between items-center w-[200px] mt-5">
                  <button onClick={decrementCount}>-</button>
                  <div>{count}</div>
                  <button onClick={incrementCount}>+</button>
                  <button
                    onClick={addToCart}
                    className="ml-5 bg-spaceCadet text-white border-solid border-2 border-spaceCadet px-2 py-2 m-1 rounded-2xl"
                  >
                    Add to order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
