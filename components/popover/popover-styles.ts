import { css } from '@emotion/react';
import { PopoverProps } from '.';

export const popoverStyles: PopoverProps['cssProps'] = props => {
  const { mode } = props.theme;
  const { thirdBackgroundColor, textColor } = props.theme[mode];

  return css`
    .ultra-tooltip {
      background-color: ${thirdBackgroundColor};
      color: ${textColor};
      box-shadow: rgb(0 0 0 / 15%) 0px 8px 30px;
      border-radius: 2px;
      &__title {
        padding: 12px 16px;
      }
      &__arrow {
        border-color: transparent ${thirdBackgroundColor} transparent transparent;
      }
    }
  `;
};
