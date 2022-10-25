import "../styles/globals.css";
import CartProvider from "../context/Cart";
import { useState, useEffect } from "react";
import Auth from "../components/auth/Auth";
import { supabase } from "../utils/supabase";
import User from "../components/user/User";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  //check if logged in
  useEffect(() => {
    let mounted = true;
    async function getInitialSession() {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        if (session) {
          setSession(session);
        }
      }
      setLoading(false);
    }

    //check for auth events
    getInitialSession();
    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  console.log(session);
  return (
    <>
      {!session ? (
        <Auth />
      ) : (
        <CartProvider>
          <User session={session} />
          <Component {...pageProps} />
        </CartProvider>
      )}
    </>
  );
}

export default MyApp;
