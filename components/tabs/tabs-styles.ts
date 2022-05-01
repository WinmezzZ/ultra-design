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
    overflow: hidden;
    .ultra-tabs-header {
      padding: 0 10px;
      display: flex;
      border-bottom: 1px solid ${borderColor};
      overflow-x: auto;
      overflow-y: hidden;
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

        &:after {
          position: absolute;
          content: ' ';
          bottom: -11px;
          left: 0;
          right: 0;
          width: 100%;
          height: 2px;
          border-radius: 4px;
          transform: scaleX(0.8);
          background-color: ${primaryColor};
          transition: opacity, transform 200ms ease-in;
          opacity: 0;
        }
        &:hover:not(&__disabled) {
          color: ${primaryColor};
        }
        &__active {
          color: ${primaryColor};
          &:after {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        &__disabled {
          cursor: not-allowed;
          color: ${disabledTextColor};
        }
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
      transform: scale(1.1);
    }

    .ultra-tabs-item-transition-enter-active {
      opacity: 0.8;
      transform: scale(1);
      transition: opacity 300ms, transform 300ms;
    }

    .ultra-tabs-item-transition-exit {
      opacity: 1;
      transform: scale(1);
    }

    .ultra-tabs-item-transition-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 300ms, transform 300ms;
    }
  `;
};

type TabsItemStylesProps = MergedTabsItemProps & ConfigProviderProps;

export const tabsItemStyles = (_props: TabsItemStylesProps) => {
  return css`
    padding: 0 4px;
  `;
};
