import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

import MenuItem from './MenuItem';

function Menu() {
  // Returns the loader data for the nearest ancestor Route loader
  const menu = useLoaderData();

  return (
    <>
      <div>/Menu</div>
      <ul className="divide-y divide-stone-200 px-2">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id}>
            pizza
          </MenuItem>
        ))}
      </ul>
    </>
  );
}

// Getting data to the route
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
