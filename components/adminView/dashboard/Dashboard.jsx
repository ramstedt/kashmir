import { supabase } from "../../../utils/supabase";
import { useState, useEffect } from "react";

export default function DashboardCard({ admin }) {
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

  //fulfil the order
  const fulfillOrder = async (order) => {
    await supabase
      .from("order")
      .update({ order_fulfilled: true })
      .eq("id", order.id);
  };

  useEffect(() => {
    fetchOrders();
    setupOrderSubscription();
  }, []);
  return (
    <>
      {admin ? (
        ""
      ) : (
        <div className="mx-2 mt-3">
          <h1>Active orders</h1>
          <table className="w-full text-xl border-collapse my-2 min-w[400px]">
            <thead>
              <tr className="bg-spaceCadet text-white text-left ">
                <th>Table</th>
                <th>Order items</th>
                <th>Special instructions</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => (
                <tr key={key}>
                  <td>{order.table}</td>
                  <td className="whitespace-nowrap">
                    {order.orderitem.map((item, key) => (
                      <div key={key} className="min-w-fit">
                        {item.quantity} of {item.menuitem.name}
                      </div>
                    ))}
                  </td>
                  <td>{order.extra_info}</td>
                  <td>
                    <button
                      onClick={() => fulfillOrder(order)}
                      className="bg-spaceCadet text-white border-solid border-2 p-2 border-spaceCadet rounded-2xl"
                    >
                      complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
