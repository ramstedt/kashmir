import { useEffect, useState } from "react";
import { useRouter, useLocation } from "next/router";

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
        </div>
      </div>
    </>
  );
}
