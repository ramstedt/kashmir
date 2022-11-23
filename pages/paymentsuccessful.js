import { useEffect, useState } from "react";
import { useRouter, useLocation } from "next/router";
import Cooking from "../public/icons/cooking.gif";
import Image from "next/image";
import { supabase } from "../utils/supabase";
import Link from "next/link";

export default function PaymentSuccessful({ session }) {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchOrder = async () => {
    try {
      setLoading(true);
      let { data: order, error } = await supabase
        .from("order")
        .select("*, orderitem(*, menuitem(*))")
        .eq("user_id", session.user.id)
        .eq("id", router.query.order_id)
        .limit(1);

      if (order) {
        setOrder(order);
        emptyCart();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const emptyCart = async () => {
    await supabase.from("cart").delete().eq("user_id", session.user.id);
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchOrder();
  }, [router.isReady]);

  return (
    <>
      <div className="mx-auto p-5 bg-white shadow-lg rounded-md max-w-xl ">
        <h1 className="text-3xl font-bold text-center">
          Thanks for your order!
        </h1>
        <div
          className="
          flex justify-center"
        >
          <div className="max-w-[200px]">
            <Image src={Cooking} alt="order successful" />
          </div>
        </div>
        <p>
          The kitchen has recieved your order.
          <br />
          Your order number is:{" "}
          <span className="text-bold">{order[0]?.id}</span>
        </p>
        <p>You ordered:</p>
        <div>
          {order[0]?.orderitem.map((item, key) => (
            <div key={key}>
              {item.quantity} of {item.menuitem.name}
            </div>
          ))}
        </div>
        <p>
          your extra info: <br />
          {order[0]?.extra_info}
        </p>
        <p>we will come to your table number {order[0]?.table} shortly.</p>
        <p>A confirmation and reciept has been sent to your email.</p>
        <Link href="/">
          <button className="cursor-pointer bg-cobalt text-white border-solid border-2 border-cobalt px-2 py-2 rounded-2xl w-full max-w-xl hover:bg-spaceCadet hover:border-spaceCadet">
            Go back to menu
          </button>
        </Link>
      </div>
    </>
  );
}
