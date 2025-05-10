import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import type { PizzaType } from "../../types";

function Menu() {
  const menu = useLoaderData();
  
  return (
    <ul>
      {menu.map((pizza: PizzaType) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
