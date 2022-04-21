import { css } from '@emotion/react';

export const transitionSlide = (className: string, duration = 300) => {
  return css`
    .${className}-enter {
      transform: scaleY(0.6);
      opacity: 0;
    }
    .${className}-enter-active {
      transform: scaleY(1);
      opacity: 1;
      transition: all ${duration}ms ease;
    }
    .${className}-exit {
      transform: scaleY(1);
      opacity: 1;
    }
    .${className}-exit-active {
      transform: scaleY(0.6);
      opacity: 0;
      transition: all ${duration}ms ease;
    }
  `;
};
