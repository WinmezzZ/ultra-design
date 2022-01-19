import React from 'react';
import Trigger, { TriggerProps } from '../trigger';
import { useMergeProps } from '../utils/mergeProps';
import { tooltipStyles } from './tooltip-styles';

export interface TooltipProps extends Omit<TriggerProps, 'content'> {
  /**
   * @description.zh-CN 提示内容
   * @description.en-US tooltip content
   */
  title?: React.ReactNode;
}

export type MergedTooltipProps = typeof defaultProps & TooltipProps;

const defaultProps = {
  name: 'ultra-tooltip',
  trigger: 'hover',
  transitionClassName: 'ultra-tooltip-layer-fade',
};

const TooltipInternal: React.ForwardRefRenderFunction<HTMLElement, TooltipProps> = (p, ref) => {
  const { title, ...props } = useMergeProps(defaultProps, p);

  return <Trigger ref={ref} content={title} {...props} css={tooltipStyles(props)} />;
};

const Tooltip = React.forwardRef(TooltipInternal);

Tooltip.displayName = 'UltraTooltip';

export default Tooltip;
