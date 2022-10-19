import MenuWrapper from "../components/consumerView/menu/MenuWrapper";
import MenuItemCard from "../components/consumerView/menu/MenuItemCard";
import { supabase } from "../utils/supabase";
import useCart from "../hooks/useCart";
import AllergyLegend from "../components/consumerView/menu/allergyLegend/AllergyLegend";

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
  const { cart, addItemToCart } = useCart();

  return (
    <>
      <MenuWrapper>
        <h1>Kashmir</h1>
        {menuitems?.map((product) => (
          <MenuItemCard
            key={product.id}
            title={product.name}
            price={product.price}
            description={product.description}
            vegan={product.is_vegan ? "vegan" : ""}
            vegetarian={product.is_vegetarian ? "vegetarian" : ""}
            nuts={product.contains_nuts ? "contains nuts" : ""}
            glutenFree={product.is_gluten_free ? "gluten free" : ""}
            addToCart={() => addItemToCart(product)}
          />
        ))}
      </MenuWrapper>
      <AllergyLegend />
    </>
  );
}
