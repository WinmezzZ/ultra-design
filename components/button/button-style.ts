import { css } from '@emotion/react';
import { ConfigProviderProps, Size } from '../config-provider/config-provider';
import React from 'react';
import { MergedButtonProps } from './button';

type ButtonStyleProps = MergedButtonProps & ConfigProviderProps;

const buttonSizeStyleMap: Record<Size, React.CSSProperties> = {
  mini: {
    height: 24,
    padding: '0px 6px',
  },
  small: {
    height: 28,
    padding: '2px 10px',
  },
  middle: {
    height: 32,
    padding: '4px 15px',
  },
  large: {
    height: 36,
    padding: '6px 20px',
  },
  larger: {
    height: 40,
    padding: '6px 25px',
  },
};

const buttonTypeStyleMap = (props: ButtonStyleProps) => {
  const { theme, type, status } = props;
  const { mode, style } = props.theme;
  const { backgroundColor, textColor, borderColor } = theme[mode];
  const primaryColor = status ? style[(status + 'Color') as `${typeof status}Color`] : theme.style.primaryColor;

  const bgColor = status ? primaryColor : type === 'primary' ? primaryColor : backgroundColor;
  const txtColor = status ? '#fff' : type === 'primary' ? '#fff' : textColor;
  const bdColor = ['text', 'primary'].includes(type as string) ? 'transparent' : borderColor;
  let baseStyle = `
    background-color: ${bgColor};
    color: ${txtColor};
    border-color: ${bdColor};
  `;

  if (type === 'text') {
    baseStyle += `
      border: none;
      color: ${primaryColor};
      background-color: unset;
    `;
  } else if (type === 'dashed') {
    baseStyle += `border: 1px dashed #ccc;`;
  } else if (type === 'primary') {
    baseStyle += `border-color: transparent;`;
  } else if (type === 'pure') {
    baseStyle += `border: none;`;
  }

  return baseStyle;
};

const loadingLayer = () => css`
  &::before {
    position: absolute;
    inset: -1px;
    z-index: 2;
    display: block;
    background: #fff;
    border-radius: inherit;
    opacity: 0.35;
    transition: opacity 0.2s;
    content: '';
    pointer-events: none;
  }
`;

const disabledStyles = (props: ButtonStyleProps) => {
  const { theme, type } = props;
  const { disabledBgColor, disabledTextColor, disabledBorderColor } = theme[theme.mode];

  return css`
    border-color: ${disabledBorderColor};
    background-color: ${type !== 'text' && disabledBgColor};
    color: ${disabledTextColor};
  `;
};

export const buttonStyles = (props: ButtonStyleProps) => {
  const { loading, disabled, type } = props;
  const { primaryColor } = props.theme.style;

  return css`
    height: ${buttonSizeStyleMap[props.size].height}px;
    padding: ${type === 'pure' ? 0 : buttonSizeStyleMap[props.size].padding};
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    border-radius: ${props.theme.style.radius}px;
    font-weight: 400;
    font-size: 14px;
    user-select: none;
    outline: none;
    text-transform: capitalize;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    border: 1px solid transparent;
    cursor: ${loading ? 'default' : disabled ? 'not-allowed' : 'pointer'};
    box-shadow: 0 2px #00000004;
    ${buttonTypeStyleMap(props)};
    ${loading && loadingLayer()};
    ${disabled && disabledStyles(props)};
    &.ultra-button--active {
      color: ${primaryColor};
    }
    .ultra-button__text {
      z-index: 1;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  `;
};
