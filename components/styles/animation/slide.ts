import { css } from '@emotion/react';

export const slide = (className: string, duration = 300) => {
  return css`
    .${className}-slide-enter {
      transform: scaleY(0.6);
      opacity: 0;
    }
    .${className}-slide-enter-active {
      transform: scaleY(1);
      opacity: 1;
      transition: all ${duration}ms ease;
    }
    .${className}-slide-exit {
      transform: scaleY(1);
      opacity: 1;
    }
    .${className}-slide-exit-active {
      transform: scaleY(0.6);
      opacity: 0;
      transition: all ${duration}ms ease;
    }
  `;
};
