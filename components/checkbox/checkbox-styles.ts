import { css } from '@emotion/react';
import { ConfigProviderProps } from '../config-provider';
import { MergedCheckboxProps } from './checkbox';
import { MergedCheckboxGroupProps } from './checkbox-group';

type CheckboxStylesProps = MergedCheckboxProps & ConfigProviderProps;

export const checkboxStyles = (props: CheckboxStylesProps) => {
  const { disabled, theme } = props;
  const { primaryColor } = theme.style;
  const { backgroundColor, borderColor, textColor, disabledBgColor, disabledBorderColor, disabledTextColor } =
    theme[theme.mode];

  return css`
    box-sizing: border-box;
    color: ${textColor};
    font-size: 14px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? 0.75 : 1};
    width: auto;
    line-height: 1.5;
    margin-left: 8px;
    &:hover .ultra-checkbox__icon {
      border-color: ${primaryColor};
    }
    .ultra-checkbox__icon {
      background-color: ${backgroundColor};
      line-height: 1;
      position: relative;
      top: 0;
      left: 0;
      width: 14px;
      height: 14px;
      border: 1px solid ${borderColor};
      border-radius: 2px;
      transition: all 0.3s;
      &:after {
        content: ' ';
        position: absolute;
        top: 50%;
        left: 21.5%;
        width: 4px;
        height: 8px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(0) translate(-50%, -50%);
        opacity: 0;
        transition: all 0.1s, opacity 0.1s;
      }
    }
    .ultra-checkbox__text {
      padding: 0 8px;
      user-select: none;
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
    }
    &.ultra-checkbox--checked {
      .ultra-checkbox__icon {
        background-color: ${primaryColor};
        border-color: ${primaryColor};
        &:after {
          border: 2px solid #fff;
          border-top: 0;
          border-left: 0;
          transform: rotate(45deg) scale(1) translate(-50%, -50%);
          opacity: 1;
          transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        }
      }
    }
    &.ultra-checkbox--disabled {
      .ultra-checkbox__icon {
        background-color: ${disabledBgColor};
        border-color: ${disabledBorderColor};
        :after {
          border-color: ${disabledBorderColor};
        }
        input {
          cursor: not-allowed;
          pointer-events: none;
        }
      }
      .ultra-checkbox__text {
        color: ${disabledTextColor};
      }
    }
    input {
      cursor: pointer;
      opacity: 0;
      padding: 0;
      margin: 0;
      outline: none;
      position: absolute;
      z-index: 1;
      font-size: 0;
      background-color: transparent;
    }
  `;
};

type CheckboxGroupStylesProps = MergedCheckboxGroupProps & ConfigProviderProps;

export const checkboxGroupStyles = (_props: CheckboxGroupStylesProps) => {
  return css``;
};
