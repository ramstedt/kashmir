import MenuWrapper from "../components/consumerView/menu/MenuWrapper";
import MenuItemCard from "../components/consumerView/menu/MenuItemCard";
import { supabase } from "../utils/supabase";

export const getStaticProps = async () => {
  let { data: menuitems } = await supabase
    .from("menuitems")
    .select("*")
    .eq("is_available", "true");
  return {
    props: {
      menuitems,
    },
  };
};

export default function Home({ menuitems }) {
  return (
    <MenuWrapper>
      <h1>Kashmir</h1>
      {menuitems?.map((item) => (
        <MenuItemCard
          key={item.id}
          title={item.name}
          price={item.price}
          description={item.description}
          vegan={item.is_vegan ? "vegan" : ""}
          vegetarian={item.is_vegetarian ? "vegetarian" : ""}
          nuts={item.contains_nuts ? "contains nuts" : ""}
          glutenFree={item.is_gluten_free ? "gluten free" : ""}
        />
      ))}
    </MenuWrapper>
  );
}
