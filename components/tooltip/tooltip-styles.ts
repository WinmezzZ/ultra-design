import { css } from '@emotion/react';
import { ConfigProviderProps } from '../config-provider';
import { transitionFade } from '../styles/transition/fade';
import { MergedTooltipProps } from './tooltip';

type TooltipStylesProps = MergedTooltipProps & ConfigProviderProps;

export const tooltipStyles = (props: TooltipStylesProps) => {
  return css`
    ${transitionFade(props.transitionClassName, props.transitionTimeout)}
  `;
};
