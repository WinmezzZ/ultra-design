import { css } from '@emotion/react';
import { SelectProps } from './select';
import { ComponentCommonProps, ConfigCommonOptions } from '../config-provider';
import { fade } from '../utils/fade';

export interface SelectCSSProps extends SelectProps, ComponentCommonProps, ConfigCommonOptions {}

export const selectStyle = (props: SelectCSSProps) => {
  const { theme } = props;
  const { primaryColor, radius } = theme.style;
  const { borderColor, backgroundColor, textColor, disabledBgColor, disabledTextColor } = theme[theme.mode];

  return css`
    display: inline-flex;
    align-items: center;
    height: 32px;
    box-sizing: border-box;
    margin: 0;
    list-style: none;
    position: relative;
    color: ${textColor};
    font-size: 14px;
    background-color: ${backgroundColor};
    border: 1px solid ${borderColor};
    border-radius: ${radius}px;
    transition: all 0.3s;
    cursor: pointer;
    user-select: none;
    :focus {
      outline: 0;
    }
    &.ultra-select--focused {
      border-color: ${primaryColor};
      box-shadow: 0 0 0 2px ${fade(primaryColor, 0.2)};
    }
    &.ultra-select--disabled {
      cursor: not-allowed;
      background-color: ${disabledBgColor};
      color: ${disabledTextColor};
      box-shadow: none;
    }
    .ultra-select__selection {
      margin-left: 12px;
      flex: 1;
      display: flex;
      align-items: center;
    }

    .ultra-select__placeholder {
      color: ${fade(textColor, 0.3)};
    }

    .ultra-select__icon {
      width: 32px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:not(&.ultra-input--disabled):hover {
      border-color: ${primaryColor};
    }

    .ultra-icon {
      display: inline-flex;
    }
  `;
};
