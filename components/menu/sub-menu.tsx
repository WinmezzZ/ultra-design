import React from 'react';
import { subMenuStyle } from './menu-style';
import { useConfigContext } from '../config-provider/useConfigContext';
import clsx from 'clsx';

export interface SubMenuProps {
  /**
   * @description.zh-CN 子菜单唯一的 key 值
   * @description.en-US Unique key value of submenu
   */
  key?: string;
  /**
   * @description.zh-CN 左侧图标
   * @description.en-US left icon
   */
  icon?: React.ReactNode;
  /**
   * @description.zh-CN 禁用状态
   * @description.en-US disabled status
   */
  disabled?: boolean;
  className?: string;
}

const SubMenuComponent: React.ForwardRefRenderFunction<HTMLLIElement, React.PropsWithChildren<SubMenuProps>> = (
  props,
  ref,
) => {
  const { children, icon, disabled, className } = props;
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  return (
    <li
      {...props}
      ref={ref}
      className={clsx('ultra-sub-menu', disabled && 'ultra-sub-menu--disabled', className)}
      css={subMenuStyle(styleProps)}
    >
      {icon}
      {children}
    </li>
  );
};

const SubMenu = React.forwardRef(SubMenuComponent);

SubMenu.displayName = 'UltraSubMenu';

export default SubMenu;
