import { css } from '@emotion/react';
import _ from 'lodash-es';
import { ConfigCommonOptions } from '../config-provider';
import { ModalProps } from './modal';

export interface ModalCSSProps extends ModalProps, ConfigCommonOptions {}

export const modalWrapperStyle = (props: ModalCSSProps) => {
  const { center, top, width, theme } = props;
  const { radius } = theme.style;
  const { thirdBackgroundColor } = theme[theme.mode];

  return css`
    position: fixed;
    inset: 0;
    z-index: 1000;
    * {
      box-sizing: border-box;
    }
    ${center &&
    css`
      text-align: center;
      &::before {
        display: inline-block;
        width: 0;
        height: 100%;
        vertical-align: middle;
        content: '';
      }
    `}
    .ultra-modal {
      position: relative;
      width: ${width};
      max-width: 90%;
      background-color: ${thirdBackgroundColor};
      padding: 20px;
      border-radius: ${radius}px;
      margin: 0 auto;
      overflow: auto;
      ${center
        ? css`
            ${!_.isNil(top) &&
            css`
              top: ${top};
            `}
            display: inline-block;
            vertical-align: middle;
            text-align: left;
          `
        : css`
            top: ${top ?? '10vh'};
          `}
      font-size: 14px;
      .ultra-modal-header {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        &__title {
          flex: 1;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 400;
          font-size: 16px;
        }

        &__close {
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .ultra-modal-body {
        padding: 20px 0;
      }
      .ultra-modal-footer {
        text-align: right;
      }
    }

    /* modal wrapper transition */

    &.ultra-modal-wrapper-enter {
      transform: scale(0);
      opacity: 0;
    }
    &.ultra-modal-wrapper-enter-active {
      transform: scale(1);
      opacity: 1;
      transition-property: transform opacity;
      transition: 300ms;
    }
    &.ultra-modal-wrapper-exit {
      opacity: 1;
      transform: scale(1);
    }
    &.ultra-modal-wrapper-exit-active {
      opacity: 0;
      transform: scale(0);
      transition-property: transform opacity;
      transition: 300ms;
    }
  `;
};
