import { AnimatePresence, LazyMotion, m } from 'framer-motion';

import { tx } from '@/utils/twind';
import { mergeProps } from '@/utils/use-merge-props';
import { forwardRef } from '@/utils/forwardRef';
import {  cloneElement, useRef, useState, useMemo, Children, isValidElement } from 'react';
import { useFloating, useHover, useFocus, useInteractions, useRole, arrow, offset, FloatingPortal, Placement, FloatingArrow, useClick } from '@floating-ui/react';
import { TRANSITION_VARIANTS } from '@/utils/transition';

const domAnimation = () => import('@/dom-animation').then((res) => res.default);

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

const Tooltip = forwardRef<TooltipProps>((props) => {
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
    useClick(context),
    useRole(context),
  ]);

  const trigger = useMemo(() => {
    const childrenNum = Children.count(children);

    if (childrenNum !== 1) throw new Error();

    if (!isValidElement(children)) {
      return <p {...getReferenceProps()}>{children}</p>;
    } else {
      const child = children as React.ReactElement & {
        ref?: React.Ref<any>;
      };

      return cloneElement(child, { ...getReferenceProps(), ref: refs.setReference });
    }
  }, [children, getReferenceProps]);


  return (
    <>
      {trigger}
      <AnimatePresence>
        <FloatingPortal root={root}>
          {isOpen && (
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
              <LazyMotion features={domAnimation}>
                <m.div
                  animate="enter"
                  exit="exit"
                  initial="exit"
                  variants={TRANSITION_VARIANTS.scaleSpring}
                >
                  <FloatingArrow context={context} ref={arrowRef} className={tx('fill-background')} />
                  <div style={{   
                    boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, .03), 0px 2px 30px 0px rgba(0, 0, 0, .08), 0px 0px 1px 0px rgba(0, 0, 0, .3)',
                  }} className={tx('rounded-lg z-10 px-2.5 py-1 w-full inline-flex flex-col items-center justify-center box-border subpixel-antialiased outline-none box-border bg-background')}>
                    {content}
                  </div>
                </m.div>
              </LazyMotion>
            </div>
          )}
        </FloatingPortal>
      </AnimatePresence>
    </>
  );
});

export default Tooltip; 