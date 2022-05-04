import { footerStyles } from './layout-styles';
import React, { forwardRef } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import clsx from 'clsx';
import withStyle from '../utils/withStyle';

export interface FooterProps {}

type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof FooterProps>;

type FooterPropsWithNativeAttrs = FooterProps & NativeAttrs;

const defaultProps = {};

export type MergedFooterProps = typeof defaultProps & FooterProps;

const Footer = forwardRef<HTMLSelectElement, FooterPropsWithNativeAttrs>((p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const { className, ...rest } = props;

  return (
    <footer ref={ref} css={footerStyles(props)} className={clsx('ultra-layout-footer', className)} {...rest}>
      {props.children}
    </footer>
  );
});

Footer.displayName = 'UltraLayoutFooter';

export default withStyle(Footer);
