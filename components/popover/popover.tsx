import React from 'react';
import Trigger, { TriggerProps } from '../trigger';
import { useMergeProps } from '../utils/mergeProps';
import { popoverStyles } from './popover-styles';

export interface PopoverProps extends TriggerProps {}

export type MergedPopoverProps = typeof defaultProps & PopoverProps;

const defaultProps = {
  name: 'ultra-popover',
  trigger: 'click',
  placement: 'bottom',
  transitionClassName: 'ultra-popover-layer-fade',
};

const PopoverInternal: React.ForwardRefRenderFunction<HTMLElement, PopoverProps> = (p, ref) => {
  const props = useMergeProps(defaultProps, p);

  return <Trigger ref={ref} {...props} css={popoverStyles(props)} />;
};

const Popover = React.forwardRef(PopoverInternal);

Popover.displayName = 'UltraPopover';

export default Popover;
