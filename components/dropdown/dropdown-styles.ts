import { css } from '@emotion/react';
import { transitionSlide } from '../styles/transition/slide';
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

    ${transitionSlide(props.transitionClassName!, props.transitionTimeout)}
  `;
};
