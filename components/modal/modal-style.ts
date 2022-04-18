import { css } from '@emotion/react';
import _ from 'lodash-es';
import { ConfigProviderProps } from '../config-provider';
import { MergedModalrProps } from './modal';
import { MergedConfirmModalrProps } from './modal-confirm';

type ModalStylesProps = MergedModalrProps & ConfigProviderProps;

export const modalWrapperStyles = (props: ModalStylesProps) => {
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
          font-weight: 500;
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
        button + button {
          margin-left: 10px;
        }
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

type ConfirmModalStylesProps = MergedConfirmModalrProps & ConfigProviderProps;

export const confirmModalStyles = (_props: ConfirmModalStylesProps) => {
  return css`
    .ultra-modal {
      min-width: 300px;
      &-header__title {
        display: flex;
        align-items: center;
        .i-icon {
          display: inline-flex;
          align-items: center;
          margin-right: 8px;
        }
      }
      &-body {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
    }
  `;
};
