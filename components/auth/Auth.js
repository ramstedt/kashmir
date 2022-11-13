import Image from "next/image";
import { supabase } from "../../utils/supabase";
import Logo from "../../public/icons/logo.svg";
import Button from "../button/Button";
import { useState } from "react";
import Spinner from "../../public/icons/spinner.svg";

export default function Auth() {
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const email = event.target.email.value;

    await supabase.auth.signInWithOtp({
      email: email,
    });
    setConfirmation("Link sent. Please check your email");
    setLoading(false);
  };
  return (
    <>
      <div className="bg-backgroundsm bg-fixed bg-center bg-cover bg-no-repeat h-full text-cobalt">
        <div className="flex flex-col h-full items-center">
          <div className="bg-cultured py-6 bg-opacity-80 mx-2 rounded-md max-w-md mt-[50px]">
            <div className="mx-2 flex flex-col items-center">
              <Image src={Logo} alt="logo" height="300" />
              <div className="my-4"></div>
              <p className="text-center">
                Please enter your email to
                <br />
                get a link to the menu
              </p>
              <form
                onSubmit={handleLogin}
                className="flex flex-col space-y-3 mt-3 max-w-[310px]"
              >
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm">
                    Email:
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="h-8 text-center border-black"
                  />
                  <span className="text-[75%]">
                    We only save your email address for order purposes
                  </span>
                </div>
                <div className="m-y-2 w-full">
                  <Button
                    type="submit"
                    text={
                      loading ? (
                        <Image src={Spinner} alt="sipnner" height="19" />
                      ) : (
                        "Send Link"
                      )
                    }
                  />
                </div>
              </form>
              <p>{confirmation} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
