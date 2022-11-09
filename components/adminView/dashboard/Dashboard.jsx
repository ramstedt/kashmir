import { supabase } from "../../../utils/supabase";
import { useState, useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Button from "../../button/Button";

export default function DashboardCard() {
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
    <div className="mx-2 mt-3">
      <h1>Active orders</h1>
      <table className="w-full text-xl border-collapse my-2 min-w[400px]">
        <thead>
          <tr className="bg-spaceCadet text-white text-left ">
            <th>Table</th>
            <th>Order items</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, key) => (
            <tr key={key}>
              <td>{order.table}</td>
              <td>
                {order.orderitem.map((item, key) => (
                  <div key={key}>
                    {item.quantity} of {item.menuitem.name}
                  </div>
                ))}
              </td>
              <td>
                <button>
                  <BsFillCheckCircleFill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
