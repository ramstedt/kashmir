import { useState, useEffect } from "react";

const useCart = () => {
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

  const addItemToCart = (id, qty = 1) => {
    const item = cart.find((i) => i.id === id);

    if (item) {
      //increase qty
      item.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { id, qty }]);
    }
  };
  const removeItemFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };
  return {
    cart,
    addItemToCart,
    removeItemFromCart,
  };
};

export default useCart;
