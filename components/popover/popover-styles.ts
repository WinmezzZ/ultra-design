import { css } from '@emotion/react';
import { PopoverProps } from '.';

export const popoverStyles: PopoverProps['cssProps'] = props => {
  const { mode } = props.theme;
  const { boxShadow } = props.theme.style;
  const { thirdBackgroundColor, textColor } = props.theme[mode];

  return css`
    .ultra-tooltip {
      background-color: ${thirdBackgroundColor};
      color: ${textColor};
      box-shadow: ${boxShadow};
      &__title {
        padding: 12px 16px;
      }
      &__arrow {
        border-color: transparent ${thirdBackgroundColor} transparent transparent;
      }
    }
  `;
};
