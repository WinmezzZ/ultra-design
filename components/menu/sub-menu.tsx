import React from 'react';
import { subMenuStyle } from './menu-style';
import { useConfigContext } from '../config-provider/useConfigContext';
import clsx from 'clsx';

export interface SubMenuProps {
  key?: string;
  icon?: React.ReactNode;
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
