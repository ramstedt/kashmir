import { createContext } from "react";

export const Context = createContext();

export default function Cart({ children }) {
  const exposed = {
    test: "hello i am test",
  };
  return (
    <>
      <Context.Provider value={exposed}>{children}</Context.Provider>
    </>
  );
}
