import AddNewForm from "../../components/adminView/addNew/AddNewForm";

export default function AddNew({ admin }) {
  return (
    <>
      {!admin ? (
        ""
      ) : (
        <>
          <AddNewForm />
        </>
      )}
    </>
  );
}
