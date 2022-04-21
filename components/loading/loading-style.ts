import { css } from '@emotion/react';
import _ from 'lodash-es';
import { ConfigProviderProps } from '../config-provider';
import { rotate } from '../styles/animation/rotate';
import { MergedLoadingrProps } from './loading';

type LoadingStylesProps = MergedLoadingrProps & ConfigProviderProps;

export const loadingWrapperStyles = (props: LoadingStylesProps) => {
  const { mask, fill, fullScreen, theme } = props;
  const { primaryColor } = theme.style;

  return css`
    ${fill || fullScreen
      ? css`
          position: ${fullScreen ? 'fixed' : 'absolute'};
          inset: 0;
          z-index: 1000;
          display: flex;
        `
      : css`
          position: relative;
          display: inline-flex;
        `}

    justify-content: center;
    align-items: center;
    color: ${primaryColor};
    * {
      box-sizing: border-box;
    }
    .ultra-loading {
      display: inline-flex;
      align-items: center;
      position: relative;
      padding: 8px 12px;
      line-height: 20px;
      font-size: 14px;
      &__icon {
        animation: ${rotate} 1s linear infinite;
        margin: 10px;
        display: inline-flex;
        align-items: center;
        .i-icon {
          display: inline-flex;
          align-items: center;
        }
      }
    }

    .ultra-mask {
      position: absolute;
      inset: 0;
      ${mask !== false &&
      css`
        background-color: ${typeof mask === 'string'
          ? mask
          : `${theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)'}`};
      `};
    }

    /* loading wrapper transition */

    &.ultra-loading-wrapper-enter {
      opacity: 0;
    }
    &.ultra-loading-wrapper-enter-active {
      opacity: 1;
      transition: opacity 300ms;
    }
    &.ultra-loading-wrapper-exit {
      opacity: 1;
    }
    &.ultra-loading-wrapper-exit-active {
      opacity: 0;
      transition: opacity 300ms;
    }
  `;
};
