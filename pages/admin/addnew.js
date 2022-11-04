import AddNewCard from "../../components/adminView/addNew/AddNewCard";

export default function AddNew({ admin }) {
  return <>{!admin ? "" : <AddNewCard />}</>;
}
