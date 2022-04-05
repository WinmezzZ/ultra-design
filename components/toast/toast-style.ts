import { css } from '@emotion/react';
import _ from 'lodash-es';
import { ConfigProviderProps } from '../config-provider';
import { MergedToastrProps } from './toast';

type ToastStylesProps = MergedToastrProps & ConfigProviderProps;

export const toastWrapperStyles = (props: ToastStylesProps) => {
  const { theme } = props;
  const { radius, boxShadow } = theme.style;
  const { thirdBackgroundColor } = theme[theme.mode];

  const top = props.top ?? '20px';

  return css`
    position: fixed;
    top: ${top};
    width: 100%;
    text-align: center;
    z-index: 1000;
    * {
      box-sizing: border-box;
    }
    .ultra-toast {
      display: inline-flex;
      align-items: center;
      position: relative;
      padding: 8px 12px;
      line-height: 20px;
      background-color: ${thirdBackgroundColor};
      border-radius: ${radius}px;
      box-shadow: ${boxShadow};
      overflow: auto;
      font-size: 14px;

      &__close {
        margin-left: 10px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
      }
      &__icon {
        margin-right: 10px;
        display: inline-flex;
        align-items: center;
        .i-icon {
          display: inline-flex;
          align-items: center;
        }
      }
    }

    /* toast wrapper transition */

    &.ultra-toast-wrapper-enter {
      top: -${top};
      padding: 0;
      opacity: 0;
    }
    &.ultra-toast-wrapper-enter-active {
      top: ${top};
      opacity: 1;
      transition: all 300ms;
    }
    &.ultra-toast-wrapper-exit {
      top: ${top};
      opacity: 1;
    }
    &.ultra-toast-wrapper-exit-active {
      top: -${top};
      padding: 0;
      opacity: 0;
      transition: all 300ms;
    }
  `;
};
