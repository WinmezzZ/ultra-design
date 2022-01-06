import { css } from '@emotion/react';
import { MenuProps } from './menu';
import { ComponentCommonProps, ConfigCommonOptions } from '../config-provider';
import { fade } from '../utils/fade';
import { SubMenuProps } from './sub-menu';

export interface MenuCSSProps extends MenuProps, ComponentCommonProps, ConfigCommonOptions {}

export const menuStyle = (props: MenuCSSProps) => {
  const { theme } = props;
  const { primaryColor } = theme.style;
  const { backgroundColor, textColor, disabledBgColor, disabledTextColor } = theme[theme.mode];

  return css`
    box-sizing: border-box;
    margin: 0;
    list-style: none;
    position: relative;
    padding: 12px;
    color: ${textColor};
    font-size: 14px;
    background-color: ${backgroundColor};
    background-image: none;
    transition: all 0.3s;

    .ultra-sub-menu.ultra-sub-menu--active {
      border-color: ${primaryColor};
      box-shadow: 0 0 0 2px ${fade(primaryColor, 0.2)};
    }
    .ultra-sub-menu.ultra-sub-menu--disabled {
      cursor: not-allowed;
      background-color: ${disabledBgColor};
      color: ${disabledTextColor};
      box-shadow: none;
    }
  `;
};

export interface SubMenuCSSProps extends SubMenuProps, ComponentCommonProps, ConfigCommonOptions {}

export const subMenuStyle = (props: SubMenuCSSProps) => {
  const { theme } = props;
  const { primaryColor, radius } = theme.style;
  const { backgroundColor, borderColor, textColor, disabledBgColor, disabledTextColor } = theme[theme.mode];

  return css`
    &.ultra-sub-menu-option--disabled {
      background-color: ${disabledBgColor};
      color: ${disabledTextColor};
      cursor: not-allowed;
    }
    &.ultra-sub-menu-option--active {
      background-color: ${fade(primaryColor, 0.1)};
      color: ${primaryColor};
    }
    &.ultra-sub-menu-option::hover {
      background-color: ${fade(primaryColor, 0.3)};
    }
  `;
};
