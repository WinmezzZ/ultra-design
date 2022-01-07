import React, { useState } from 'react';
import { menuStyle } from './menu-style';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import { SubMenuProps } from './sub-menu';

export interface MenuProps {
  onClick?: (key: string) => void;
}

const MenuComponent: React.ForwardRefRenderFunction<HTMLUListElement, MenuProps> = (props, ref) => {
  const { children, onClick } = props;
  const [activeSubMenu, setActiveSubMenu] = useState<string>();
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  const handleClick = (item: SubMenuProps) => {
    setActiveSubMenu(item.key);
    onClick?.(item.key!);
  };

  const renderItem = (item: any, props: SubMenuProps) => {
    const key = item.key.replace(/^.\$/, '');

    return React.cloneElement(item, {
      ...props,
      className: clsx(activeSubMenu === key && 'ultra-sub-menu--active'),
      onClick: () =>
        !props.disabled &&
        handleClick({
          ...props,
          key,
        }),
    });
  };

  return (
    <ul ref={ref} className="ultra-menu" css={menuStyle(styleProps)}>
      {children && React.Children.toArray(children).map((child: any) => renderItem(child, child.props))}
    </ul>
  );
};

const Menu = React.forwardRef(MenuComponent);

Menu.displayName = 'UltraMenu';

export default Menu;
