import { contentStyles } from './layout-styles';
import React, { forwardRef } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import clsx from 'clsx';
import withStyle from '../utils/withStyle';

export interface ContentProps {}

type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof ContentProps>;

type ContentPropsWithNativeAttrs = ContentProps & NativeAttrs;

const defaultProps = {};

export type MergedContentProps = typeof defaultProps & ContentProps;

const Content = forwardRef<HTMLSelectElement, ContentPropsWithNativeAttrs>((p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const { className, ...rest } = props;

  return (
    <main ref={ref} css={contentStyles(props)} className={clsx('ultra-layout-content', className)} {...rest}>
      {props.children}
    </main>
  );
});

Content.displayName = 'UltraLayoutContent';

export default withStyle(Content);
