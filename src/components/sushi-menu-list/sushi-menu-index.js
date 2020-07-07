import React from 'react';
import { Store } from '../../store';
import SushiMenuList from './sushi-menu-list';


export default function SushiMenuIndex() {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.sushiMenu.length === 0 && fetchSushiMenu(dispatch);
  });

  const props = {
    sushiMenu: state.sushiMenu,
  };

  return (
    <>
      <section className="sushi-menu-container">
        <SushiMenuList {...props} />
      </section>
    </>
  );
}
