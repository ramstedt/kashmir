import MenuItemCard from "../components/consumerView/menu/MenuItemCard";
import { supabase } from "../utils/supabase";
import AllergyLegend from "../components/consumerView/menu/allergyLegend/AllergyLegend";
import MenuNav from "../components/consumerView/menu/navbar/MenuNav";
import Logo from "../public/icons/kashmir-logo.svg";
import Image from "next/image";
import { TbSeedingOff, TbEgg } from "react-icons/tb";
import { RiLeafFill } from "react-icons/ri";
import { GiPeanut } from "react-icons/gi";

export const getServerSideProps = async () => {
  const { data: menuitems } = await supabase
    .from("menuitem")
    .select("*, category(name)")
    .eq("is_available", "true")
    .gte("stock", 1);

  return {
    props: {
      menuitems,
    },
  };
};
export default function Menu({ menuitems, session }) {
  return (
    <>
      <div className="max-w-lg flex flex-col m-auto">
        <Image src={Logo} alt="logo" height="500" />
        <h1 className="text-center my-4">Menu</h1>
        <AllergyLegend />
        <div className="mx-2">
          <h3 className="text-center">Starters</h3>
          {menuitems?.map((product, key) => {
            if (product.category.name === "starter") {
              return (
                <MenuItemCard
                  key={key}
                  productId={product.id}
                  title={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  vegan={product.is_vegan ? <RiLeafFill /> : ""}
                  vegetarian={product.is_vegetarian ? <TbEgg /> : ""}
                  nuts={product.contains_nuts ? <GiPeanut /> : ""}
                  glutenFree={product.is_gluten_free ? <TbSeedingOff /> : ""}
                  addToCart={() => addItemToCart(product)}
                  session={session}
                />
              );
            }
          })}
          <h3 className="text-center">Main courses</h3>
          {menuitems?.map((product, key) => {
            if (product.category.name === "main course") {
              return (
                <MenuItemCard
                  key={key}
                  productId={product.id}
                  title={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  vegan={product.is_vegan ? <RiLeafFill /> : ""}
                  vegetarian={product.is_vegetarian ? <TbEgg /> : ""}
                  nuts={product.contains_nuts ? <GiPeanut /> : ""}
                  glutenFree={product.is_gluten_free ? <TbSeedingOff /> : ""}
                  addToCart={() => addItemToCart(product)}
                  session={session}
                />
              );
            }
          })}
          <h3 className="text-center">Drinks</h3>
          {menuitems?.map((product, key) => {
            if (product.category.name === "drink") {
              return (
                <MenuItemCard
                  key={key}
                  productId={product.id}
                  title={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  vegan={product.is_vegan ? <RiLeafFill /> : ""}
                  vegetarian={product.is_vegetarian ? <TbEgg /> : ""}
                  nuts={product.contains_nuts ? <GiPeanut /> : ""}
                  glutenFree={product.is_gluten_free ? <TbSeedingOff /> : ""}
                  addToCart={() => addItemToCart(product)}
                  session={session}
                />
              );
            }
          })}
          <h3 className="text-center">Desserts</h3>
          {menuitems?.map((product, key) => {
            if (product.category.name === "dessert") {
              return (
                <MenuItemCard
                  key={key}
                  productId={product.id}
                  title={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  vegan={product.is_vegan ? <RiLeafFill /> : ""}
                  vegetarian={product.is_vegetarian ? <TbEgg /> : ""}
                  nuts={product.contains_nuts ? <GiPeanut /> : ""}
                  glutenFree={product.is_gluten_free ? <TbSeedingOff /> : ""}
                  addToCart={() => addItemToCart(product)}
                  session={session}
                />
              );
            }
          })}
        </div>
      </div>
      <MenuNav session={session} />
    </>
  );
}
