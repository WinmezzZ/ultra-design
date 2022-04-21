import React, { useState } from 'react';
import { menuStyles } from './menu-style';
import clsx from 'clsx';
import { SubMenuProps } from './sub-menu';
import { useMergeProps } from '../utils/mergeProps';

export interface Props {
  /**
   * @description.zh-CN 水平展示，用作于顶部导航栏
   * @description.en-US Horizontal display, used for top navigation bar
   */
  horizontal?: boolean;
  /**
   * @description.zh-CN 默认选中的子菜单项
   * @description.en-US default selected menu item
   */
  defaultSelectedKey?: string;
  /**
   * @description.zh-CN 点击子菜单时触发的回调
   * @description.en-US triggered when clicked a subMenu
   */
  onClick?: (key: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof Props>;

export type MenuProps = Props & NativeAttrs;

const defaultProps = {};

export type MergedMenuProps = typeof defaultProps & MenuProps;

const MenuComponent: React.ForwardRefRenderFunction<HTMLUListElement, React.PropsWithChildren<MenuProps>> = (
  p,
  ref,
) => {
  const props = useMergeProps(defaultProps, p);
  const { children, className, style, onClick, defaultSelectedKey, horizontal } = props;
  const [activeSubMenu, setActiveSubMenu] = useState(defaultSelectedKey);

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
    <ul
      ref={ref}
      style={style}
      className={clsx('ultra-menu', className, horizontal && 'ultra-menu--horizontal')}
      css={menuStyles(props)}
    >
      {children && React.Children.toArray(children).map((child: any) => renderItem(child, child.props))}
    </ul>
  );
};

const Menu = React.forwardRef(MenuComponent);

Menu.displayName = 'UltraMenu';

export default Menu;
