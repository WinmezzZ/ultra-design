import {
  flip,
  useListNavigation,
  useTypeahead,
  FloatingFocusManager,
  FloatingList
} from "@floating-ui/react";
import { SelectContext } from "./select-context";
import { AnimatePresence, LazyMotion, m } from 'framer-motion';

import { tx } from '@/utils/twind';
import { useRef, useState, useMemo, useEffect, ReactNode,  useCallback } from 'react';
import { useFloating, useInteractions, useRole, arrow, offset, FloatingPortal, FloatingArrow, useClick, autoUpdate, useDismiss, ElementProps, UseFloatingOptions, UseRoleProps } from '@floating-ui/react';
import { TRANSITION_VARIANTS } from '@/utils/transition';
import { useMergedRefs } from "@/utils/use-merge-refs";

const domAnimation = () => import('@/dom-animation').then((res) => res.default);

const ARROW_HEIGHT = 7;
const GAP = 2;

export interface SelectProps {
  className?: string;
  style?: React.CSSProperties;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  root?: HTMLElement;
  showArrow?: boolean;
  interactions?: ElementProps[];
  floatingProps?: UseFloatingOptions;
  role?: UseRoleProps['role'];
}

const Select = (props: SelectProps) => {
  const { open, onOpenChange, children, root, defaultOpen, showArrow = true, className, style } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const arrowRef = useRef(null);
  
  useEffect(() => {
    setInternalOpen(open);
  }, [open]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(new Set());

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: internalOpen,
    onOpenChange(open) {
      setInternalOpen(open);
      onOpenChange?.(open);
    },
    whileElementsMounted: autoUpdate,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(ARROW_HEIGHT + GAP),
      flip()
    ],
  });

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((index: number) => {
    setSelectedIndices((prevSelectedIndices) => {
      const newSelectedIndices = new Set(prevSelectedIndices);
      if (newSelectedIndices.has(index)) {
        newSelectedIndices.delete(index);
      } else {
        newSelectedIndices.add(index);
      }
      return newSelectedIndices;
    });

    setSelectedLabels((prevSelectedLabels) => {
      const newSelectedLabels = new Set(prevSelectedLabels);
      const label = labelsRef.current[index];
      if (label) {
        if (newSelectedLabels.has(label)) {
          newSelectedLabels.delete(label);
        } else {
          newSelectedLabels.add(label);
        }
      }
      return newSelectedLabels;
    });
  }, []);

  function handleTypeaheadMatch(index: number | null) {
    if (internalOpen) {
      setActiveIndex(index);
    } else if (index !== null) {
      handleSelect(index);
    }
  }

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex: null,
    onNavigate: setActiveIndex
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex: null,
    onMatch: handleTypeaheadMatch
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([listNav, typeahead, click, dismiss, role]);

  const selectContext = useMemo(
    () => ({
      activeIndex,
      selectedIndices,
      getItemProps,
      handleSelect
    }),
    [activeIndex, selectedIndices, getItemProps, handleSelect]
  );

  useEffect(() => {
    if (internalOpen && popoverRef.current && triggerRef.current) {
      let selectRect = triggerRef.current.getBoundingClientRect();
      let popover = popoverRef.current;

      popover.style.width = selectRect.width + "px";
    }
  }, [internalOpen]);

  const referenceRefs = useMergedRefs(refs.setReference, triggerRef);
  const floatingRefs = useMergedRefs(refs.setFloating, popoverRef);

  return (
    <>
       <div 
        ref={referenceRefs} 
        tabIndex={0} 
        className={tx(`
          items-center justify-center min-h-4 p-2 min-w-20 cursor-pointer rounded-md border
          border-solid border-gray-200 select-none`,
          className
        )}
        {...getReferenceProps({
          style
        })} 
      >
        {Array.from(selectedLabels).join(", ") || "Select..."}
      </div>

      <SelectContext.Provider value={selectContext}>
      <AnimatePresence>
        <FloatingPortal root={root}>
          {internalOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div ref={floatingRefs} style={floatingStyles} {...getFloatingProps()}>
              <LazyMotion features={domAnimation}>
                <m.div
                  animate="enter"
                  exit="exit"
                  initial="exit"
                  variants={TRANSITION_VARIANTS.scaleSpringOpacity}
                >
                  {showArrow && <FloatingArrow context={context} ref={arrowRef} className={tx('fill-background')} />}
                  <ul 
                    style={{   
                      boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, .03), 0px 2px 30px 0px rgba(0, 0, 0, .08), 0px 0px 1px 0px rgba(0, 0, 0, .3)',
                    }} 
                    className={tx(`
                      gap-0.5 rounded-lg z-10 p-2 w-full inline-flex flex-col items-center justify-center m-0
                      box-border subpixel-antialiased outline-none box-border bg-background [&_*]:box-border list-none
                    `)}
                  >
                    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                      {children}
                    </FloatingList>
                  </ul>
                </m.div>
              </LazyMotion>
            </div>
          </FloatingFocusManager>
          )}
        </FloatingPortal>
      </AnimatePresence>
      </SelectContext.Provider>
    </>
  );
}

export default Select;