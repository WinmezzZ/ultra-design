import { css } from '@emotion/react';
import { TextareaProps } from 'ultra-design';
import { ConfigProviderProps } from '../config-provider';
import { fade } from '../utils/fade';

type TextareaStylesProps = TextareaProps & ConfigProviderProps;

export const textareaStyles = (props: TextareaStylesProps) => {
  const { theme } = props;
  const { primaryColor, radius } = theme.style;
  const { borderColor, backgroundColor, textColor, disabledBgColor, disabledTextColor } = theme[theme.mode];

  return css`
    margin: 0;
    list-style: none;
    position: relative;
    display: inline-flex;
    width: initial;
    padding: 8px;
    color: ${textColor};
    background-color: ${backgroundColor};
    background-image: none;
    border: 1px solid ${borderColor};
    border-radius: ${radius}px;
    transition: all 0.3s;
    &.ultra-textarea--focused {
      border-color: ${primaryColor};
      box-shadow: 0 0 0 2px ${fade(primaryColor, 0.2)};
    }
    &.ultra-textarea--disabled {
      cursor: not-allowed;
      background-color: ${disabledBgColor};
      color: ${disabledTextColor};
      box-shadow: none;
      textarea {
        flex: 1;
        cursor: not-allowed;
        color: ${disabledTextColor};
      }
    }
    &:not(&.ultra-textarea--disabled):hover {
      border-color: ${primaryColor};
    }
    textarea {
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

    .ultra-textarea__icon {
      display: flex;
      align-items: center;
    }

    .ultra-textarea__clear {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `;
};

export const textareaWithLabelStyles = (props: TextareaStylesProps) => {
  const { theme } = props;
  const { textColor } = theme[theme.mode];

  return css`
    flex: 1;
    font-size: 14px;
    display: flex;
    color: ${textColor};

    .ultra-textarea__label {
      white-space: nowrap;
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
  `;
};
