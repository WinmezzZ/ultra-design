import { css } from '@emotion/react';

export const modalWrapperStyle = css`
  position: fixed;
  inset: 0;
  z-index: 1000;
  .ultra-modal {
    position: relative;
    top: 100px;
    width: 50%;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
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
