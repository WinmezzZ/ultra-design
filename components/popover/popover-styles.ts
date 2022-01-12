import { css } from '@emotion/react';
import { ConfigContextOptions } from '..';
import { transitionFade } from '../styles/transition/fade';
import { MergedPopoverProps } from './popover';

export interface TooltipStylesProps extends MergedPopoverProps, ConfigContextOptions {}

export const popoverStyles = (props: TooltipStylesProps) => {
  const { mode } = props.theme;
  const { boxShadow } = props.theme.style;
  const { thirdBackgroundColor, textColor } = props.theme[mode];

  return css`
    &.${props.name}-layer-wrapper {
      .${props.name} {
        background-color: ${thirdBackgroundColor};
        color: ${textColor};
        box-shadow: ${boxShadow};
        &__content {
          padding: 12px 16px;
        }
        &__arrow {
          border-color: transparent ${thirdBackgroundColor} transparent transparent;
        }
      }

      ${transitionFade(props.transitionClassName, props.transitionTimeout)}
    }
  `;
};
