import { motion } from 'framer-motion';

import { tx } from '@/utils/twind';
import { mergeProps } from '@/utils/use-merge-props';
import { withStyle } from '@/utils/with-style';
import {  cloneElement, useRef, useState } from 'react';
import { useFloating, useHover, useFocus, useInteractions, useRole, arrow, offset, FloatingPortal, Placement } from '@floating-ui/react';

const ARROW_HEIGHT = 7;
const GAP = 2;

export interface TooltipProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  content?: React.ReactNode;
  children: React.ReactNode;
  root?: HTMLElement;
}

const Tooltip = withStyle<unknown, TooltipProps>((props) => {
  const { open, onOpenChange, placement, content, children, root } = mergeProps({ open: false, root: document.body }, props);
 
  const [isOpen, setIsOpen] = useState(open);
  const arrowRef = useRef(null);

  const { context, refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange(open) {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    placement,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(ARROW_HEIGHT + GAP)
    ],
  });
 
  const {getReferenceProps, getFloatingProps} = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context),
  ]);

  return (
    <>
      {
        cloneElement(children as React.ReactElement, {
          ref: refs.setReference,
          ...getReferenceProps(),
        })
      }
      {isOpen && (
        <FloatingPortal root={root}>
          <motion.div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
          >
            {content}
          </motion.div>
        </FloatingPortal>
      )}
    </>
  );
});

export default Tooltip;
