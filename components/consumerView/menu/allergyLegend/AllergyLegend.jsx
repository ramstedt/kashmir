import { TbSeedingOff, TbEgg } from "react-icons/tb";
import { RiLeafFill } from "react-icons/ri";
import { GiPeanut } from "react-icons/gi";

export default function AllergyLegend() {
  return (
    <div className=" grid grid-cols-2 w-fit self-center">
      <div className="flex items-center">
        <TbSeedingOff /> = gluten free
      </div>
      <div className="flex items-center">
        <RiLeafFill /> = vegan
      </div>
      <div className="flex items-center">
        <TbEgg /> = vegetarian
      </div>
      <div className="flex items-center">
        <GiPeanut /> = contains nuts
      </div>
    </div>
  );
}
