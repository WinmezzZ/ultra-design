import MenuComponent from './menu';
import SubMenu from './sub-menu';

export type { MenuProps } from './menu';
export type { SubMenuProps } from './sub-menu';

type MenuType = typeof MenuComponent;

interface MenuComponentType extends MenuType {
  SubMenu: typeof SubMenu;
}

const Menu: MenuComponentType = Object.assign(MenuComponent, {
  SubMenu,
});

export default Menu;
