import React, { MouseEvent } from 'react';
import { dropdownTitleStyle } from './dropdown-styles';
import clsx from 'clsx';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';

export interface DropdownTitleProps {
  /**
   * @description.zh-CN 左侧图标
   * @description.en-US left icon
   */
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const defaultProps = {};

export type MergedDropdownTitleProps = typeof defaultProps & DropdownTitleProps;

const DropdownTitleComponent: React.ForwardRefRenderFunction<
  HTMLDivElement,
  React.PropsWithChildren<DropdownTitleProps>
> = (p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const { children, icon, className } = props;

  return (
    <div {...props} ref={ref} className={clsx('ultra-dropdown-title', className)} css={dropdownTitleStyle(props)}>
      {icon}
      {children}
    </div>
  );
};

const DropdownTitle = React.forwardRef(DropdownTitleComponent);

DropdownTitle.displayName = 'UltraDropdownTitle';

export default withStyle(DropdownTitle);
