import AddNewForm from "../../components/adminView/addNew/AddNewForm";
import AdminNav from "../../components/adminView/navbar/Navbar";

export const getServerSideProps = async () => {
  const { data: menuitems } = await supabase
    .from("menuitem")
    .select("*")
    .eq("is_available", "true")
    .gte("stock", 1);

  return {
    props: {
      menuitems,
    },
  };
};

export default function AddNew({ admin }) {
  return (
    <>
      {!admin ? (
        ""
      ) : (
        <>
          <AdminNav />
          <AddNewForm />
        </>
      )}
    </>
  );
}
