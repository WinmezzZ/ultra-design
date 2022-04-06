import { css } from '@emotion/react';
import { MergedMenuProps } from './menu';
import { MergedSubMenuProps } from './sub-menu';
import { fade } from '../utils/fade';
import { ConfigProviderProps } from '../config-provider';

type MenuStylesProps = MergedMenuProps & ConfigProviderProps;

export const menuStyles = (props: MenuStylesProps) => {
  const { theme } = props;
  const { backgroundColor, textColor } = theme[theme.mode];

  return css`
    box-sizing: border-box;
    margin: 0;
    list-style: none;
    position: relative;
    padding: 12px;
    color: ${fade(textColor, 0.8)};
    font-size: 14px;
    background-color: ${backgroundColor};
    background-image: none;
    transition: all 0.3s;
    .ultra-sub-menu {
      margin-bottom: 4px;
      &:nth-last-of-type() {
        margin-bottom: 0;
      }
    }

    &.ultra-menu--horizontal {
      display: flex;
      .ultra-sub-menu {
        min-height: 48px;
        padding: 0 20px;
        margin-bottom: 0;
        &--active {
          background-color: inherit;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            bottom: 0;
            width: calc(100% - 20px);
            height: 2px;
            left: 50%;
            transform: translateX(-50%);
            background-color: ${theme.style.primaryColor};
          }
        }
      }
    }
  `;
};

type SubMenuCSSProps = MergedSubMenuProps & ConfigProviderProps;

export const subMenuStyle = (props: SubMenuCSSProps) => {
  const { theme } = props;
  const { primaryColor } = theme.style;
  const { textColor, disabledBgColor, disabledTextColor } = theme[theme.mode];

  return css`
    display: flex;
    align-items: center;
    padding: 0 12px;
    min-height: 40px;
    cursor: pointer;
    user-select: none;
    &.ultra-sub-menu--disabled {
      background-color: ${disabledBgColor};
      color: ${disabledTextColor};
      cursor: not-allowed;
    }

    &.ultra-sub-menu--active {
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
    &:hover:not(.ultra-sub-menu--disabled, .ultra-sub-menu--active) {
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
