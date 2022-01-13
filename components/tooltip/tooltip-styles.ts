import { css } from '@emotion/react';
import { ConfigContextOptions } from '../config-provider';
import { transitionFade } from '../styles/transition/fade';
import { MergedTooltipProps } from './tooltip';

export interface TooltipStylesProps extends MergedTooltipProps, ConfigContextOptions {}

export const tooltipStyles = (props: TooltipStylesProps) => {
  return css`
    ${transitionFade(props.transitionClassName, props.transitionTimeout)}
  `;
};
