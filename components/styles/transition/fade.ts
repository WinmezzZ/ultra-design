import { css } from '@emotion/react';

export const transitionFade = (className: string, duration = 300) => {
  return css`
    .${className}-fade-enter {
      opacity: 0;
    }
    .${className}-fade-enter-active {
      opacity: 1;
      transition: opacity ${duration}ms;
    }
    .${className}-fade-exit {
      opacity: 1;
    }
    .${className}-fade-exit-active {
      opacity: 0;
      transition: opacity ${duration}ms;
    }
  `;
};
