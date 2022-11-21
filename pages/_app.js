import "../styles/globals.css";
import { useState, useEffect } from "react";
import Auth from "../components/auth/Auth";
import { supabase } from "../utils/supabase";
import AdminNav from "../components/adminView/navbar/Navbar";
import Footer from "../components/consumerView/footer/Footer";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [admin, setIsAdmin] = useState(null);
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
          const { data: admin } = await supabase
            .from("admin")
            .select("is_admin")
            .limit(1)
            .eq("user_id", session.user.id);
          if (admin) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
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

  return (
    <div className="min-h-[100%] relative pb-[500px]">
      {!session ? (
        <Auth />
      ) : (
        <>
          <AdminNav />
          <Component {...pageProps} session={session} admin={admin} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default MyApp;
