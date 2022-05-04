import { css } from '@emotion/react';
import { ConfigProviderProps } from '../config-provider';
import { MergedHeaderProps } from './header';
import { MergedLayoutProps } from './layout';

type LayoutStylesProps = MergedLayoutProps & ConfigProviderProps;

export const layoutStyles = (_props: LayoutStylesProps) => {
  return css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `;
};

type LayoutHeaderStylesProps = MergedHeaderProps & ConfigProviderProps;

export const headerStyles = (props: LayoutHeaderStylesProps) => {
  const { theme, color } = props;
  const { backgroundColor, textColor } = theme[theme.mode];

  return css`
    background-color: ${color === 'default' ? backgroundColor : color === 'primary' ? theme.style.primaryColor : color};
    color: ${color === 'primary' ? ' #fff' : textColor};
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
};

export const siderStyles = (_props: LayoutStylesProps) => {
  return css`
    width: 200px;
    height: 100%;
  `;
};

export const contentStyles = (_props: LayoutStylesProps) => {
  return css`
    flex: 1;
    padding: 12px;
  `;
};

export const footerStyles = (_props: LayoutStylesProps) => {
  return css`
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
  `;
};
