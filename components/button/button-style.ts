import { css } from '@emotion/react';
import { ComponentCommonProps, ConfigCommonOptions, Size } from '../config-provider';
import React from 'react';
import { ButtonProps } from '.';

export interface ButtonStyleProps
  extends Omit<ButtonProps, keyof ComponentCommonProps>,
    ComponentCommonProps,
    ConfigCommonOptions {}

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
  const { theme, type } = props;
  const { mode } = props.theme;

  const { backgroundColor, textColor, borderColor } = theme[mode];

  const bgColor = type === 'primary' ? theme?.style.primaryColor : backgroundColor;
  const txtColor = type === 'primary' ? '#fff' : textColor;
  const bdColor = ['text', 'primary'].includes(type as string) ? 'transparent' : borderColor;
  let baseStyle = `
    background-color: ${bgColor};
    color: ${txtColor};
    border-color: ${bdColor};
  `;

  if (type === 'text') {
    baseStyle += `
      border: none;
      color: ${theme.style.primaryColor};
    `;
  } else if (type === 'dashed') {
    baseStyle += `border: 1px dashed #ccc;`;
  } else if (type === 'primary') {
    baseStyle += `border-color: transparent;`;
  }

  return baseStyle;
};

export const buttonStyles = (props: ButtonStyleProps) => {
  // const { theme, type } = props;
  // const { mode } = props.theme;

  return css`
    height: ${buttonSizeStyleMap[props.size].height}px;
    padding: ${buttonSizeStyleMap[props.size].padding};
    box-sizing: border-box;
    display: inline-block;
    border-radius: ${props.theme.style.radius}px;
    font-weight: 400;
    font-size: 14px;
    user-select: none;
    outline: none;
    text-transform: capitalize;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    transition: background-color 200ms ease 0ms, box-shadow 200ms ease 0ms, border 200ms ease 0ms, color 200ms ease 0ms;
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
    cursor: pointer;
    box-shadow: 0 2px #00000004;
    ${buttonTypeStyleMap(props)}
  `;
};
