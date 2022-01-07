import MenuComponent from './menu';
import SubMenu from './sub-menu';

export { SubMenu };
export type { MenuProps } from './menu';
export type { SubMenuProps } from './sub-menu';

type MenuType = typeof MenuComponent;

interface MenuComponentType extends MenuType {
  SubMenu: typeof SubMenu;
}

const Menu = MenuComponent as MenuComponentType;

Menu.SubMenu = SubMenu;

export default Menu;
