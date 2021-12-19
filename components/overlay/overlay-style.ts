import { css } from '@emotion/react';
import { OverlayProps } from './overlay';

export const overlayStyle = (props: OverlayProps) => {
  const { timeout } = props;

  return css`
    .ultra-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 1000;
    }
    /* overlay transition */
    .ultra-overlay-enter {
      opacity: 0;
    }
    .ultra-overlay-enter-active {
      opacity: 1;
      transition: opacity ${timeout}ms;
    }
    .ultra-overlay-exit {
      opacity: 1;
    }
    .ultra-overlay-exit-active {
      opacity: 0;
      transition: opacity ${timeout}ms;
    }
  `;
};
