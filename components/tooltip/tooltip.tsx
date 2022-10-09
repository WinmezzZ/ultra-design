import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Trigger, { TriggerProps } from '../trigger';
import { TriggerRef } from '../trigger/trigger';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';
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

const TooltipComponent = forwardRef<any, TooltipProps>((p, r) => {
  const { title, ...props } = useMergeProps(defaultProps, p);
  const triggerRef = useRef<TriggerRef>(null);

  useImperativeHandle(r, () => triggerRef.current?.layerElement, [triggerRef]);

  return <Trigger content={title} ref={triggerRef} {...props} css={tooltipStyles(props)} />;
});

TooltipComponent.displayName = 'UltraTooltip';

const Tooltip = withStyle(TooltipComponent);

export default Tooltip;
