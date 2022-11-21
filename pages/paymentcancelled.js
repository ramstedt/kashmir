import Logo from "../public/icons/kashmir-logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function PaymentCancelled() {
  return (
    <div className="mx-2">
      <div className="my-2">
        <Image src={Logo} alt="logo" height="500" />
      </div>
      <p className="text-center my-7">
        Your order was cancelled. <br />
        You have not been charged.
      </p>
      <Link href="/">
        <button className="cursor-pointer bg-cobalt text-white border-solid border-2 border-cobalt px-2 py-2 rounded-2xl w-full max-w-xl hover:bg-spaceCadet hover:border-spaceCadet">
          Return to menu
        </button>
      </Link>
    </div>
  );
}
