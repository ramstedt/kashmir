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
  //subscribe to order changes
  const orderUpdates = async () => {
    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "order",
          filter: `user_id=eq.${session.user.id}`,
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();
  };
  console.log(orders);
  useEffect(() => {
    fetchOrders();
    orderUpdates();
  }, []);
  return (
    <>
      <h2 className="mb-2">Active orders</h2>

      {orders.map((order, key) => {
        if (!order.order_fulfilled) {
          return (
            <div key={key} className=" shadow-md rounded mb-3 p-2 border">
              <h4 className="text-cobalt">
                Order: {order.id} to Table {order.table}
              </h4>

              <div>
                {order.orderitem.map((order, key) => (
                  <p key={key}>
                    {order.quantity} {order.menuitem.name}
                  </p>
                ))}
              </div>
            </div>
          );
        }
      })}
      <h2 className="mb-2 mt-5">Order History</h2>
      {orders.map((order, key) => {
        if (order.order_fulfilled) {
          return (
            <div key={key} className=" shadow-md rounded mb-3 p-2 border">
              <h4 className="text-cobalt">
                Order: {order.id} to Table {order.table}
              </h4>

              <div>
                {order.orderitem.map((order, key) => (
                  <p key={key}>
                    {order.quantity} {order.menuitem.name}
                  </p>
                ))}
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
