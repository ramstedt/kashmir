import { supabase } from "../../../../utils/supabase";
import { useState, useEffect } from "react";

export default function OrderHistory({ session }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let { data: orders, error } = await supabase
        .from("order")
        .select("*, orderitem(*, menuitem(*))")
        .eq("user_id", session.user.id);

      if (orders) {
        setOrders(orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(orders);
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      <h2>Active orders</h2>
      {orders.map((order, key) => {
        if (!order.order_fulfilled) {
          return (
            <div key={key}>
              {order.id} of {order.table}
            </div>
          );
        }
      })}

      <h2>Order History</h2>
      {orders.map((order, key) => {
        if (order.order_fulfilled) {
          return (
            <div key={key}>
              {order.id} of {order.table}
            </div>
          );
        }
      })}
    </>
  );
}
