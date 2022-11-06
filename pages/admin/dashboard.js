import DashboardCard from "../../components/adminView/dashboard/Dashboard";

export default function Dashboard({ admin }) {
  return <>{!admin ? "" : <DashboardCard />}</>;
}
