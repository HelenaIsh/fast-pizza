import { useLoaderData } from 'react-router-dom';
import MenuItem from './MenuItem';
import type { PizzaType } from '../../types';

export default function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza: PizzaType) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
