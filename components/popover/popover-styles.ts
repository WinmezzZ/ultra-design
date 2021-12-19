import { css } from '@emotion/react';
import { PopoverProps } from '.';

export const popoverStyles: PopoverProps['cssProps'] = props => {
  const { mode } = props.theme;
  const { thirdBackgroundColor, textColor } = props.theme[mode];

  return css`
    .layer {
      background-color: ${thirdBackgroundColor};
      color: ${textColor};
      box-shadow: rgb(0 0 0 / 15%) 0px 8px 30px;
      border-radius: 2px;
      .title {
        padding: 12px 16px;
      }
      .arrow {
        border-color: transparent ${thirdBackgroundColor} transparent transparent;
      }
    }
  `;
};
