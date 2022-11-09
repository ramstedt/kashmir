import { supabase } from "../../../utils/supabase";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
    <>
      <TableContainer>
        <Table sx={{ maxWidth: 650 }} aria-label="table with orders">
          <TableHead>
            <TableRow>
              <TableCell>Table number</TableCell>
              <TableCell align="right">Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.table}
                </TableCell>
                <TableCell align="right">
                  {order.orderitem.map((item, key) => (
                    <div key={key}>
                      {item.menuitem.name} {item.quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell component="th" scope="row">
                  complete
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
