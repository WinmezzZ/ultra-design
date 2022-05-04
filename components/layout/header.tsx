import { headerStyles } from './layout-styles';
import React, { forwardRef } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import clsx from 'clsx';
import withStyle from '../utils/withStyle';

export interface HeaderProps {
  /**
   * @description background-color
   * @default 'default'
   */
  color?: 'primary' | 'default';
}

type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof HeaderProps>;

type HeaderPropsWithNativeAttrs = HeaderProps & NativeAttrs;

const defaultProps = {
  color: 'default',
};

export type MergedHeaderProps = typeof defaultProps & HeaderProps;

const Header = forwardRef<HTMLSelectElement, HeaderPropsWithNativeAttrs>((p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const { className, color: _color, ...rest } = props;

  return (
    <header ref={ref} css={headerStyles(props)} className={clsx('ultra-layout-header', className)} {...rest}>
      {props.children}
    </header>
  );
});

Header.displayName = 'UltraLayoutHeader';

export default withStyle(Header);
