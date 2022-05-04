import { siderStyles } from './layout-styles';
import React, { forwardRef } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import clsx from 'clsx';
import withStyle from '../utils/withStyle';

export interface SiderProps {
  /**
   * @description width
   * @default 200
   */
  width?: string | number;
}

type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof SiderProps>;

type SiderPropsWithNativeAttrs = SiderProps & NativeAttrs;

const defaultProps = {
  width: 200,
};

export type MergedSiderProps = typeof defaultProps & SiderProps;

const Sider = forwardRef<HTMLSelectElement, SiderPropsWithNativeAttrs>((p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const { className, style, width, ...rest } = props;

  return (
    <aside
      ref={ref}
      css={siderStyles(props)}
      style={{ width, ...style }}
      className={clsx('ultra-layout-sider', className)}
      {...rest}
    >
      {props.children}
    </aside>
  );
});

Sider.displayName = 'UltraLayoutSider';

export default withStyle(Sider);
