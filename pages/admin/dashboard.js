import DashboardCard from "../../components/adminView/dashboard/Dashboard";
import AdminNav from "../../components/adminView/navbar/Navbar";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

export default function Dashboard({ admin, session }) {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      let { data: orders, error } = await supabase
        .from("order")
        .select("*, orderitem(*, menuitem(*))")
        .eq("payment_status", "COMPLETED")
        .eq("order_fulfilled", false);

      if (orders) {
        setOrders(orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //refresh the dahsboard in real time using supabase subscribe
  const setupOrderSubscription = async () => {
    const order = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "order" },
        () => {
          fetchOrders();
        }
      )
      .subscribe();
  };

  useEffect(() => {
    fetchOrders();
    setupOrderSubscription();
  }, []);
  return (
    <>
      {!admin ? (
        ""
      ) : (
        <>
          <AdminNav />

          <DashboardCard />
        </>
      )}
    </>
  );
}
