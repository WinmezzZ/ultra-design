import { css } from '@emotion/react';
import { ConfigProviderProps } from '../config-provider';
import { transitionSlide } from '../styles/transition/slide';
import { fade } from '../utils/fade';
import { MergedDropdownProps } from './dropdown';
import { MergedDropdownItemProps } from './dropdown-item';

type DropdownStylesProps = MergedDropdownProps & ConfigProviderProps;

export const dropdownStyles = (props: DropdownStylesProps) => {
  const { boxShadow, radius } = props.theme.style;
  const { thirdBackgroundColor, textColor } = props.theme[props.theme.mode];

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
        &__arrow {
          border-color: transparent ${thirdBackgroundColor} transparent transparent;
        }
      }
    }

    .ultra-divider:not(.ultra-divider--vetical) {
      margin: 4px 0;
    }

    ${transitionSlide(props.transitionClassName, props.transitionTimeout)}
  `;
};

type SubMenuCSSProps = MergedDropdownItemProps & ConfigProviderProps;

export const dropdownItemStyle = (props: SubMenuCSSProps) => {
  const { theme } = props;
  const { primaryColor } = theme.style;
  const { textColor, disabledBgColor, disabledTextColor } = theme[theme.mode];

  return css`
    display: flex;
    align-items: center;
    padding: 0 12px;
    min-height: 32px;
    cursor: pointer;
    user-select: none;
    &.ultra-dropdown-item--disabled {
      background-color: ${disabledBgColor};
      color: ${disabledTextColor};
      cursor: not-allowed;
    }

    &.ultra-dropdown-item--active {
      ${theme.mode === 'dark'
        ? css`
            background-color: ${primaryColor};
            color: ${textColor};
          `
        : css`
            background-color: ${fade(primaryColor, 0.1)};
            color: ${primaryColor};
          `}
    }
    &:hover:not(.ultra-dropdown-item--disabled, .ultra-dropdown-item--active) {
      ${theme.mode === 'dark'
        ? css`
            color: ${fade(textColor, 1)};
          `
        : css`
            background-color: #f0f1f3;
          `}
    }
  `;
};

export const dropdownTitleStyle = (props: SubMenuCSSProps) => {
  const { theme } = props;
  const { textColor } = theme[theme.mode];

  return css`
    display: flex;
    align-items: center;
    height: 28px;
    user-select: none;
    font-size: 12px;
    padding: 8px 12px 4px;
    color: ${fade(textColor, 0.4)};
    transition: all 0.3s;
    box-sizing: border-box;
  `;
};
