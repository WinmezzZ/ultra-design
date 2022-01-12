import { css } from '@emotion/react';
import { ConfigContextOptions } from '../config-provider';
import { transitionFade } from '../styles/transition/fade';
import { MergedTooltipProps } from './tooltip';

export interface TooltipCSSProps extends MergedTooltipProps, ConfigContextOptions {}

export const toolTipCSS = (props: TooltipCSSProps) => {
  return css`
    ${transitionFade(props.transitionClassName, props.transitionTimeout)}
  `;
};
