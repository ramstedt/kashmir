import MenuItemCard from "../components/consumerView/menu/MenuItemCard";
import { supabase } from "../utils/supabase";
import AllergyLegend from "../components/consumerView/menu/allergyLegend/AllergyLegend";
import MenuNav from "../components/consumerView/menu/navbar/MenuNav";

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

export default function Menu({ menuitems, session }) {
  console.log(session);
  return (
    <>
      <div className="max-w-lg flex flex-col m-auto">
        <h1>Kashmir</h1>
        {menuitems?.map((product, key) => (
          <MenuItemCard
            key={key}
            productId={product.id}
            title={product.name}
            price={product.price}
            description={product.description}
            vegan={product.is_vegan ? "vegan" : ""}
            vegetarian={product.is_vegetarian ? "vegetarian" : ""}
            nuts={product.contains_nuts ? "contains nuts" : ""}
            glutenFree={product.is_gluten_free ? "gluten free" : ""}
            addToCart={() => addItemToCart(product)}
            session={session}
          />
        ))}
        <AllergyLegend />
      </div>
      <MenuNav session={session} />
    </>
  );
}
