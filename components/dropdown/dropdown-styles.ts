import { css } from '@emotion/react';
import { DropdownProps } from './dropdown';

export const dropdownStyles: DropdownProps['cssProps'] = props => {
  const { mode } = props.theme;
  const { boxShadow, radius } = props.theme.style;
  const { thirdBackgroundColor, textColor } = props.theme[mode];

  return css`
    .ultra-tooltip {
      transform-origin: top;
      background-color: ${thirdBackgroundColor};
      color: ${textColor};
      box-shadow: ${boxShadow};
      border-radius: ${radius}px;
      &__title {
        padding: 8px 0;
      }
      &__arrow {
        border-color: transparent ${thirdBackgroundColor} transparent transparent;
      }
    }

    .ultra-dropdown-animate-slide-enter {
      transform: scaleY(0.6);
      opacity: 0;
    }
    .ultra-dropdown-animate-slide-enter-active {
      transform: scaleY(1);
      opacity: 1;
      transition: all 300ms ease;
    }
    .ultra-dropdown-animate-slide-exit {
      transform: scaleY(1);
      opacity: 1;
    }
    .ultra-dropdown-animate-slide-exit-active {
      transform: scaleY(0.6);
      opacity: 0;
      transition: all 300ms ease;
    }
  `;
};
