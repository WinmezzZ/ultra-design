import React, { FC } from 'react';
import Trigger, { TriggerProps } from '../trigger';
import { useMergeProps } from '../utils/mergeProps';

export type PositionRect = Omit<DOMRect, 'toJSON'>;

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
  placement: 'bottom',
  transitionClassName: 'ultra-tooltip-layer-fade',
};

const Tooltip: FC<TooltipProps> = p => {
  const { title, ...props } = useMergeProps(defaultProps, p);

  return <Trigger content={title} {...props} />;
};

Tooltip.displayName = 'UltraTooltip';

export default Tooltip;
