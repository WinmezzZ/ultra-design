import { forwardRef } from 'react';
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

const Popover = forwardRef<any, PopoverProps>((p, r) => {
  const props = useMergeProps(defaultProps, p);

  return <Trigger ref={r} {...props} css={popoverStyles(props)} />;
});

Popover.displayName = 'UltraPopover';

export default Popover;
