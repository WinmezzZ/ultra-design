import React, { Children, useCallback, useRef, useState } from 'react';
import { menuStyle } from './menu-style';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import { SubMenuProps } from '.';
import SubMenu from './sub-menu';

export interface MenuProps {}

const MenuComponent: React.ForwardRefRenderFunction<HTMLMenuElement, MenuProps> = (props, ref) => {
  const { children } = props;
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };
  const [activeSubMenu, setActiveSubMenu] = useState<string>();

  const handleClick = (item: SubMenuProps) => {
    console.log(item);
    setActiveSubMenu(item.key);
    // setMenuValue(e.target.value);
    // onChange?.(e.target.value, e);
  };

  const renderItem = (item: any, props: any) => {
    console.log(props);

    return item;
  };

  const renderContent = () => {
    const menus = React.Children.toArray(children) as React.ReactElement[];

    return menus.filter((item: any) => item.type !== 'string' && item.type.displayName === 'UltraSubMenu');
  };

  return (
    <ul className="ultra-menu" css={menuStyle(styleProps)}>
      {renderContent().map((child: any) => renderItem(child, child.props))}
    </ul>
  );
};

const Menu = React.forwardRef(MenuComponent);

Menu.displayName = 'UltraMenu';

export default Menu;
