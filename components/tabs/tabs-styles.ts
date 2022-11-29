import { css } from '@emotion/react';
import { ConfigProviderProps } from '..';
import { MergedTabsProps } from './tabs';
import { MergedTabsItemProps } from './tabs-item';

type TabsStylesProps = MergedTabsProps & ConfigProviderProps;

export const tabsStyles = (props: TabsStylesProps) => {
  const { theme } = props;
  const { primaryColor, radius } = theme.style;
  const { borderColor, disabledTextColor } = props.theme[props.theme.mode];

  return css`
    color: ${theme[theme.mode].textColor};
    border-radius: ${radius}px;
    border: 1px solid ${borderColor};
    padding: 16px;
    .ultra-tabs-header {
      padding: 0 10px;
      display: flex;
      border-bottom: 1px solid ${borderColor};
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      &-item {
        padding: 14px 18px;
        cursor: pointer;
        position: relative;
        display: inline-flex;
        white-space: nowrap;
        transition: color 0.3s;
        &__icon {
          margin-right: 8px;
          display: inline-flex;
          align-items: center;
        }

        &:hover:not(&__disabled) {
          color: ${primaryColor};
        }

        &:after {
          transform: scaleX(1);
          .ultra-tabs-header-item__dir--left {
            transform-origin: left;
          }
          .ultra-tabs-header-item__dir--right {
            transform-origin: right;
          }
        }
        &__active {
          color: ${primaryColor};
          &:after {
            transform: scaleX(1);
            .ultra-tabs-header-item__dir--left {
              transform-origin: left;
            }
            .ultra-tabs-header-item__dir--right {
              transform-origin: right;
            }
          }
        }
        &__disabled {
          cursor: not-allowed;
          color: ${disabledTextColor};
        }
      }

      &-sub {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        transform: scaleX(0);
        background-color: ${primaryColor};
      }
    }

    .ultra-tabs-content {
      padding: 10px;
      .ultra-tabs-item {
        padding-top: 8px;
        &__inactive {
          height: 0;
          padding: 0 !important;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
        }
      }
    }

    .ultra-tabs-item-transition-enter {
      opacity: 0;
      /* transform: scale(1.1); */
    }

    .ultra-tabs-item-transition-enter-active {
      opacity: 0.8;
      /* transform: scale(1); */
      transition: opacity 300ms;
    }

    .ultra-tabs-item-transition-exit {
      opacity: 1;
      /* transform: scale(1); */
    }

    .ultra-tabs-item-transition-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 300ms;
    }
  `;
};

type TabsItemStylesProps = MergedTabsItemProps & ConfigProviderProps;

export const tabsItemStyles = (_props: TabsItemStylesProps) => {
  return css`
    padding: 0 4px;
  `;
};
