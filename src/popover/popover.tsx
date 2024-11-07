import { AnimatePresence, LazyMotion, m } from 'framer-motion';

import { tx } from '@/utils/twind';
import {  cloneElement, useRef, useState, useMemo, Children, isValidElement, useEffect, FC } from 'react';
import { useFloating, useFocus, useInteractions, useRole, arrow, offset, FloatingPortal, Placement, FloatingArrow, useClick, autoUpdate, useDismiss, ElementProps, UseFloatingOptions, UseRoleProps } from '@floating-ui/react';
import { TRANSITION_VARIANTS } from '@/utils/transition';
import { merge } from 'lodash-es';

const domAnimation = () => import('@/dom-animation').then((res) => res.default);

const ARROW_HEIGHT = 7;
const GAP = 2;

export interface PopoverProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  content?: React.ReactNode;
  children: React.ReactNode;
  root?: HTMLElement;
  showArrow?: boolean;
  interactions?: ElementProps[];
  floatingProps?: UseFloatingOptions;
  role?: UseRoleProps['role'];
}

const Popover: FC<PopoverProps> = (props) => {
  const { open, onOpenChange, placement, content, children, root, defaultOpen, showArrow = true, interactions = [], floatingProps = {} } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const arrowRef = useRef(null);
  
  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  const { context, refs, floatingStyles } = useFloating(merge<UseFloatingOptions, UseFloatingOptions>( {
    open: internalOpen,
    onOpenChange(open) {
      setInternalOpen(open);
      onOpenChange?.(open);
    },
    placement,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(ARROW_HEIGHT + GAP)
    ],
    whileElementsMounted: autoUpdate
  }, floatingProps));
 
  const {getReferenceProps, getFloatingProps} = useInteractions([
    useFocus(context),
    useClick(context),
    useRole(context),
    useDismiss(context),
    ...interactions
  ]);

  const trigger = useMemo(() => {
    const childrenNum = Children.count(children);

    if (childrenNum !== 1) throw new Error();

    if (!isValidElement(children)) {
      return <p {...getReferenceProps()}>{children}</p>;
    } else {
      const child = children as React.ReactElement;

      return cloneElement(child, { ...getReferenceProps(), ref: refs.setReference });
    }
  }, [children, getReferenceProps]);


  return (
    <>
      {trigger}
      <AnimatePresence>
        <FloatingPortal root={root}>
          {internalOpen && (
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
              <LazyMotion features={domAnimation}>
                <m.div
                  animate="enter"
                  exit="exit"
                  initial="exit"
                  variants={TRANSITION_VARIANTS.scaleSpringOpacity}
                >
                  {showArrow && <FloatingArrow context={context} ref={arrowRef} className={tx('fill-background')} />}
                  <div style={{   
                    boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, .03), 0px 2px 30px 0px rgba(0, 0, 0, .08), 0px 0px 1px 0px rgba(0, 0, 0, .3)',
                  }} className={tx('rounded-lg z-10 px-3 w-full inline-flex flex-col items-center justify-center box-border subpixel-antialiased outline-none box-border bg-background')}>
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
};

export default Popover; 
