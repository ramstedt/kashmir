import { createContext, useState, useEffect } from "react";

export const Context = createContext();

export default function Cart({ children }) {
  const getExistingCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  let [count, setCount] = useState(1);
  const incrementCount = () => {
    count = count + 1;
    setCount(count);
  };
  const decrementCount = () => {
    count = count - 1;
    if (count <= 0) {
      count = 0;
    }
    setCount(count);
  };

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
    let calcTotal = 0;
    cart.forEach((item) => (calcTotal += item.price * item.qty));
    setTotal(calcTotal);
  }, [cart]);

  const addItemToCart = (product, qty = count) => {
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

  const emptyCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };
  const exposed = {
    cart,
    addItemToCart,
    removeItemFromCart,
    total,
    emptyCart,
  };

  return (
    <>
      <Context.Provider value={exposed}>{children}</Context.Provider>
    </>
  );
}
