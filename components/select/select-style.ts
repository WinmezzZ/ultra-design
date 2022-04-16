import { css } from '@emotion/react';
import { MergedSelectProps } from './select';
import { fade } from '../utils/fade';
import { transitionSlide } from '../styles/transition/slide';
import { ConfigProviderProps } from '../config-provider';

type SelectStylesProps = MergedSelectProps & ConfigProviderProps;

export const selectLayerStyles = (props: SelectStylesProps) => {
  const { theme } = props;
  const { radius, boxShadow } = theme.style;
  const { textColor, thirdBackgroundColor } = theme[theme.mode];

  return css`
    &.${props.name}-layer-wrapper {
      .${props.name} {
        transform-origin: top;
        background-color: ${thirdBackgroundColor};
        color: ${textColor};
        box-shadow: ${boxShadow};
        border-radius: ${radius}px;
        &__content {
          padding: 8px 0;
        }
      }
      ${transitionSlide('ultra-select-layer-slide')}
    }
  `;
};

export const selectStyles = (props: SelectStylesProps) => {
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
      white-space: nowrap;
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
