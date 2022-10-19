import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export default function Cart({ children }) {
  const getExistingCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);

  useEffect(() => {
    //check if cart exists
    const existingCart = getExistingCart();
    console.log(getExistingCart());
    // console.log(`hej ${JSON.stringify(existingCart)}`);
    if (existingCart) {
      setCart(existingCart);
    }
  }, []);

  useEffect(() => {
    // write to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (product, qty = 1) => {
    const item = cart.find((i) => i.id === product.id);

    if (item) {
      //increase quantity
      item.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, qty }]);
    }
  };
  const removeItemFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };
  const exposed = {
    cart,
    addItemToCart,
    removeItemFromCart,
  };

  return (
    <>
      <Context.Provider value={exposed}>{children}</Context.Provider>
    </>
  );
}
