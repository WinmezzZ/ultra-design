import { css } from '@emotion/react';
import { DropdownProps } from './dropdown';

export const dropdownStyles: DropdownProps['cssProps'] = props => {
  const { mode } = props.theme;
  const { boxShadow } = props.theme.style;
  const { thirdBackgroundColor, textColor } = props.theme[mode];

  return css`
    --scale-y: 0.9;
    .ultra-tooltip {
      background-color: ${thirdBackgroundColor};
      color: ${textColor};
      box-shadow: ${boxShadow};
      border-radius: 2px;
      &__title {
        padding: 12px 16px;
      }
      &__arrow {
        border-color: transparent ${thirdBackgroundColor} transparent transparent;
      }
    }

    .ultra-dropdown-layer-slide-enter {
      max-height: 50px;
      overflow: hidden;
    }
    .ultra-dropdown-layer-slide-enter-active {
      max-height: 200px;
      transition: max-height 300ms ease;
    }
    .ultra-dropdown-layer-slide-exit {
      opacity: 1;
    }
    .ultra-dropdown-layer-slide-exit-active {
      opacity: 0;
      transition: opacity 200ms ease;
    }
  `;
};
