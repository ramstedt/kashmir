import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    async function logoutUser() {
      await supabase.auth.signOut();
      router.push("/");
    }
    logoutUser();
  });
  return <p>Logging you out</p>;
};

export default Logout;
