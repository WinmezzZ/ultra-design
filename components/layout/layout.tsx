import { layoutStyles } from './layout-styles';
import React, { forwardRef } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import clsx from 'clsx';
import withStyle from '../utils/withStyle';

export interface LayoutProps {
  /**
   * @description className
   */
  className?: string;
  /**
   * @description style
   */
  style?: React.CSSProperties;
}

type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof LayoutProps>;

type LayoutPropsWithNativeAttrs = LayoutProps & NativeAttrs;

const defaultProps = {};

export type MergedLayoutProps = typeof defaultProps & LayoutProps;

const Layout = forwardRef<HTMLSelectElement, LayoutPropsWithNativeAttrs>((p, ref) => {
  const props = useMergeProps(defaultProps, p);

  const { className, style, ...rest } = props;

  const hasSiderLayout = React.Children.toArray(props.children).some((child: any) => {
    return child.type.displayName === 'UltraLayoutSider';
  });

  return (
    <section
      ref={ref}
      css={layoutStyles(props)}
      style={{ flexDirection: hasSiderLayout ? 'row' : 'column', ...style }}
      className={clsx('ultra-layout', className)}
      {...rest}
    >
      {props.children}
    </section>
  );
});

Layout.displayName = 'UltraLayout';

export default withStyle(Layout);
