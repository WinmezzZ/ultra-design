import { css } from '@emotion/react';
import { InputProps } from 'ultra-design';
import { ConfigProviderProps } from '../config-provider';
import { fade } from '../utils/fade';

type InputStylesProps = InputProps & ConfigProviderProps;

export const inputStyles = (props: InputStylesProps) => {
  const { theme } = props;
  const { primaryColor, radius } = theme.style;
  const { borderColor, backgroundColor, textColor, disabledBgColor, disabledTextColor } = theme[theme.mode];

  return css`
    box-sizing: border-box;
    margin: 0;
    list-style: none;
    position: relative;
    display: inline-flex;
    width: 100%;
    min-width: 0;
    padding: 7px 11px;
    color: ${textColor};
    font-size: 14px;
    background-color: ${backgroundColor};
    background-image: none;
    border: 1px solid ${borderColor};
    border-radius: ${radius}px;
    transition: all 0.3s;
    &.ultra-input--focused {
      border-color: ${primaryColor};
      box-shadow: 0 0 0 2px ${fade(primaryColor, 0.2)};
    }
    &.ultra-input--disabled {
      cursor: not-allowed;
      background-color: ${disabledBgColor};
      color: ${disabledTextColor};
      box-shadow: none;
      input {
        flex: 1;
        cursor: not-allowed;
        color: ${disabledTextColor};
      }
    }
    &:not(&.ultra-input--disabled):hover {
      border-color: ${primaryColor};
    }
    input {
      width: 100%;
      padding: 0;
      border: none;
      outline: none;
      background-color: transparent;
      color: ${textColor};
    }

    .ultra-icon {
      display: inline-flex;
    }

    .ultra-input__icon {
      display: flex;
      align-items: center;
    }

    .ultra-input__clear {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `;
};
