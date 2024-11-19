import {
  flip,
  useListNavigation,
  FloatingList,
  FloatingFocusManager
} from "@floating-ui/react";
import { SelectContext } from "./select-context";
import { AnimatePresence, LazyMotion, m } from 'framer-motion';

import { tx } from '@/utils/twind';
import { useRef, useState, useMemo, useEffect, ReactNode,  useCallback, ChangeEvent, isValidElement, Children, ReactElement, useLayoutEffect } from 'react';
import { useFloating, useInteractions, useRole, arrow, offset, FloatingPortal, FloatingArrow, useClick, autoUpdate, useDismiss, ElementProps, UseFloatingOptions, UseRoleProps } from '@floating-ui/react';
import { TRANSITION_VARIANTS } from '@/utils/transition';
import { useMergedRefs } from "@/utils/use-merge-refs";
import { Value } from "@/types/value";
import { Option, SelectOptionProps } from "./select-option";
import { uuid } from "@/utils/uuid";
import { CircleX } from "lucide-react";
import { toArray } from "@/utils/to-array";

const domAnimation = () => import('@/dom-animation').then((res) => res.default);

const ARROW_HEIGHT = 7;
const GAP = 2;

export interface SelectProps<T extends K extends true ? Value[] : Value, K extends boolean> {
  className?: string;
  style?: React.CSSProperties;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  children: ReactNode;
  root?: HTMLElement;
  showArrow?: boolean;
  interactions?: ElementProps[];
  floatingProps?: UseFloatingOptions;
  role?: UseRoleProps['role'];
  searchable?: boolean;
  placeholder?: string;
  multiple?: K;
}

function Select<T extends K extends true ? Value[] : Value, K extends boolean>(props: SelectProps<T, K>) {
  const { value, onValueChange, defaultValue, multiple =false, open, onOpenChange, children, root, defaultOpen, showArrow = true, className, style, searchable, placeholder = "Select..." } = props;
  const [internalValue, setInternalValue] = useState(toArray(defaultValue));
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const arrowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [searchValue, setSearchValue] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  
  const options = useMemo(() => {
    const childs = Children.toArray(children) as ReactElement<SelectOptionProps>[];
    return childs.filter((child) => isValidElement<typeof Option>(child) && child.type === Option).map(child => child.props);
  }, [children]);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  useEffect(() => {
    if (!value) return;
    setInternalValue(toArray(value));
  }, [value]);

  useEffect(() => {
    const indices = internalValue.map(v => options.findIndex(option => option.value === v));
    setSelectedIndices(new Set(indices));
  }, [internalValue])

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

  const handleSelect = useCallback((index: number, value: Value) => {
    setSelectedIndices((prevSelectedIndices) => {
      const newSelectedIndices = new Set(prevSelectedIndices);
      if (newSelectedIndices.has(index)) {
        newSelectedIndices.delete(index);
      } else {
        newSelectedIndices.add(index);
      }
      return newSelectedIndices;
    });

    const _internalValue = internalValue.includes(value) 
      ? internalValue.filter(v => v !== value) 
      : [...internalValue, value];
      

      console.log('multiple', multiple)
    setInternalValue(multiple ? _internalValue : (_internalValue.length > 0 ? [_internalValue[_internalValue.length - 1]] : []));
    onValueChange?.(multiple ? _internalValue as T : _internalValue[0] as T);
  }, [internalValue, multiple, onValueChange]);

  const selectedLabels = useMemo(() => {
    return internalValue.map((v, index) => {
      const option = options.find(option => option.value === v);
      const label = option?.children || option?.label || "";
      if (multiple) {
        return <div key={uuid()} className={tx('inline-flex items-center gap-1 bg-primary text-background rounded-md px-1.5 py-0.5')}>
          {label}
          <CircleX size={14} onClick={(e) => {
            e.stopPropagation();
            handleSelect(index, v);
          }} />
        </div>
      }
      return label;
    });
  }, [internalValue, options]);

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex: null,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([listNav, click, dismiss, role]);

   const minSelectedIndex = useMemo(() => {
    return Math.min(...Array.from(selectedIndices));
  }, [selectedIndices]);

  useLayoutEffect(() => {
    if (internalOpen && popoverRef.current && triggerRef.current) {
      let selectRect = triggerRef.current.getBoundingClientRect();
      let popover = popoverRef.current;

      popover.style.width = selectRect.width + "px";
    }
  }, [internalOpen]);

  useLayoutEffect(() => {
    if (!internalOpen) return;
    
    requestAnimationFrame(() => {
      const elements = elementsRef.current;
      const list = listRef.current;
      if (!elements.length || !list) return;

      if (list.offsetHeight < list.scrollHeight) {
        const item = elements[minSelectedIndex];

        if (item) {
          list.scrollTop = item.offsetTop - list.offsetHeight / 2 + item.offsetHeight / 2 + 9;
        }
      }
    })
  }, [internalOpen, popoverRef, minSelectedIndex, elementsRef.current.length, listRef.current]);

  const referenceRefs = useMergedRefs(refs.setReference, triggerRef);
  const floatingRefs = useMergedRefs(refs.setFloating, popoverRef);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div 
        ref={referenceRefs} 
        tabIndex={0} 
        className={tx(`
          flex gap-1 items-center flex-wrap p-2 min-h-[40px] min-w-[200px] cursor-pointer rounded-md border
          border-solid border-gray-200 select-none relative`,
          className
        )}
        {...getReferenceProps({
          style
        })} 
      >
        {
          selectedLabels
        }
      </div>

      <SelectContext.Provider value={{
        activeIndex,
        selectedIndices,
        getItemProps,
        handleSelect,
        searchValue,
        open: internalOpen || false,
      }}>
        <AnimatePresence>
          <FloatingPortal root={root}>
            {internalOpen && (
              <FloatingFocusManager initialFocus={1} context={context}>
                <div ref={floatingRefs} style={{
                  ...floatingStyles,
                  boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, .03), 0px 2px 30px 0px rgba(0, 0, 0, .08), 0px 0px 1px 0px rgba(0, 0, 0, .3)',
                }} {...getFloatingProps()}  className={tx('py-3 box-border subpixel-antialiased outline-none box-border bg-background [&_*]:box-border ')}>
                  <LazyMotion features={domAnimation}>
                    <m.div
                      animate="enter"
                      exit="exit"
                      initial="exit"
                      variants={TRANSITION_VARIANTS.scaleSpringOpacity}
                    >
                      {showArrow && <FloatingArrow context={context} ref={arrowRef} className={tx('fill-background')} />}
                      {searchable && (
                        <div className="py-2 px-3">
                          <input
                              autoFocus
                              tabIndex={1}
                              type="text"
                              value={searchValue}
                              onChange={handleSearchChange}
                              placeholder={placeholder}
                              className={tx(`
                                w-full bg-transparent border-none outline-none h-8 rounded-md mb-2 p-2
                                placeholder:text-gray-400 border-gray-200 border-1 border-solid
                                `)}
                            />
                          </div>
                        )}
                      <ul
                        ref={listRef}
                        className={tx(`
                          px-3 gap-0.5 rounded-lg z-10 w-full inline-flex flex-col m-0 p-0 overflow-y-auto max-h-60 list-none 
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