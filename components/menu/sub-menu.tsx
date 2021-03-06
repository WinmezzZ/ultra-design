import React from 'react';
import { subMenuStyle } from './menu-style';
import clsx from 'clsx';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';

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
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const defaultProps = {};

export type MergedSubMenuProps = typeof defaultProps & SubMenuProps;

const SubMenuComponent: React.ForwardRefRenderFunction<HTMLLIElement, React.PropsWithChildren<SubMenuProps>> = (
  p,
  ref,
) => {
  const props = useMergeProps(defaultProps, p);
  const { children, icon, disabled, className, ...rest } = props;

  return (
    <li
      ref={ref}
      className={clsx('ultra-sub-menu', disabled && 'ultra-sub-menu--disabled', className)}
      css={subMenuStyle(props)}
      {...rest}
    >
      {icon}
      {children}
    </li>
  );
};

const SubMenu = React.forwardRef(SubMenuComponent);

SubMenu.displayName = 'UltraSubMenu';

export default withStyle(SubMenu);
