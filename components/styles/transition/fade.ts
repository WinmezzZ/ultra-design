import { css } from '@emotion/react';

export const transitionFade = (className?: string, duration = 300) => {
  if (!className) return undefined;

  return css`
    .${className}-enter {
      opacity: 0;
    }
    .${className}-enter-active {
      opacity: 1;
      transition: all ${duration}ms;
    }
    .${className}-exit {
      opacity: 1;
    }
    .${className}-exit-active {
      opacity: 0;
      transition: all ${duration}ms;
    }
  `;
};
