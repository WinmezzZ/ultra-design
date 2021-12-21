import { css } from '@emotion/react';
import { InputProps } from 'ultra-design';
import { ComponentCommonProps, ConfigCommonOptions } from '../config-provider';
import { fade } from '../utils/fade';

export interface InputCSSProps extends InputProps, ComponentCommonProps, ConfigCommonOptions {}

export const inputStyle = (props: InputCSSProps) => {
  const { theme } = props;
  const { primaryColor, radius } = theme.style;
  const { borderColor, backgroundColor, textColor } = theme[theme.mode];

  return css`
    box-sizing: border-box;
    margin: 0;
    list-style: none;
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    padding: 4px 11px;
    color: ${textColor};
    font-size: 14px;
    background-color: ${backgroundColor};
    background-image: none;
    border: 1px solid ${borderColor};
    border-radius: ${radius}px;
    transition: all 0.3s;
    &.ultra-input-focused {
      border-color: ${primaryColor};
      box-shadow: 0 0 0 2px ${fade(primaryColor, 0.2)};
    }
    input {
      width: 100%;
      padding: 0;
      border: none;
      outline: none;
      background-color: transparent;
      color: ${textColor};
    }
  `;
};
