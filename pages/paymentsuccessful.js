import { useEffect, useState } from "react";
import { useRouter, useLocation } from "next/router";
import Cooking from "../public/icons/cooking.gif";
import Image from "next/image";

export default function PaymentSuccessful() {
  const router = useRouter();
  useEffect(() => {
    const queries = router.query;
    console.log(queries);
  }, []);
  return (
    <>
      <div className="">
        <div className="mx-auto p-5">
          <h1 className="text-3xl font-bold">Thanks for your order!</h1>
          <Image src={Cooking} alt="order successful" />
          <p>The kitchen has recieved your order.</p>
          <p>A reciept has been sent to your email.</p>
          <button>back to menu</button>
        </div>
      </div>
    </>
  );
}
