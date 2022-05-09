import React, { MouseEvent } from 'react';
import { dropdownItemStyle } from './dropdown-styles';
import clsx from 'clsx';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';

export interface DropdownItemProps {
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
  onClick?: (e: MouseEvent) => void;
}

const defaultProps = {};

export type MergedDropdownItemProps = typeof defaultProps & DropdownItemProps;

const DropdownItemComponent: React.ForwardRefRenderFunction<
  HTMLLIElement,
  React.PropsWithChildren<DropdownItemProps>
> = (p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const { children, icon, disabled, className } = props;

  return (
    <li
      {...props}
      ref={ref}
      className={clsx('ultra-dropdown-item', disabled && 'ultra-dropdown-item--disabled', className)}
      css={dropdownItemStyle(props)}
    >
      {icon}
      {children}
    </li>
  );
};

const DropdownItem = React.forwardRef(DropdownItemComponent);

DropdownItem.displayName = 'UltraDropdownItem';

export default withStyle(DropdownItem);
