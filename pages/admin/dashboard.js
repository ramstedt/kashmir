import DashboardCard from "../../components/adminView/dashboard/Dashboard";
import AdminNav from "../../components/adminView/navbar/Navbar";

export default function Dashboard({ admin, session }) {
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
