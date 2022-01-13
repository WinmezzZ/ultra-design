import { css } from '@emotion/react';
import { ConfigContextOptions } from '../config-provider';
import { transitionSlide } from '../styles/transition/slide';
import { MergedDropdownProps } from './dropdown';

export interface DropdownStylesProps extends MergedDropdownProps, ConfigContextOptions {}

export const dropdownStyles = (props: DropdownStylesProps) => {
  const { boxShadow, radius } = props.theme.style;
  const { thirdBackgroundColor, textColor } = props.theme[props.theme.mode];

  return css`
    &.${props.name}-layer-wrapper {
      .${props.name} {
        transform-origin: top;
        background-color: ${thirdBackgroundColor};
        color: ${textColor};
        box-shadow: ${boxShadow};
        border-radius: ${radius}px;
        &__content {
          padding: 8px 0;
        }
        &__arrow {
          border-color: transparent ${thirdBackgroundColor} transparent transparent;
        }
      }

      ${transitionSlide(props.transitionClassName, props.transitionTimeout)}
    }
  `;
};
