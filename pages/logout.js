import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      router.push("/login");
    };
  }, []);
  return <p>Logging you out</p>;
};

export default Logout;
