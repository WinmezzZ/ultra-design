import {
  flip,
  useListNavigation,
  FloatingList
} from "@floating-ui/react";
import { SelectContext } from "./select-context";
import { AnimatePresence, LazyMotion, m } from 'framer-motion';

import { tx } from '@/utils/twind';
import { useRef, useState, useMemo, useEffect, ReactNode,  useCallback, ChangeEvent, isValidElement, Children, ReactElement } from 'react';
import { useFloating, useInteractions, useRole, arrow, offset, FloatingPortal, FloatingArrow, useClick, autoUpdate, useDismiss, ElementProps, UseFloatingOptions, UseRoleProps } from '@floating-ui/react';
import { TRANSITION_VARIANTS } from '@/utils/transition';
import { useMergedRefs } from "@/utils/use-merge-refs";
import { Value } from "@/types/value";
import { Option, SelectOptionProps } from "./select-option";

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
  const { value, onValueChange, defaultValue, multiple, open, onOpenChange, children, root, defaultOpen, showArrow = true, className, style, searchable, placeholder = "Select..." } = props;
  const [internalValue, setInternalValue] = useState<Value[]>(multiple ? defaultValue as Value[] : defaultValue ? [defaultValue as Value] : []);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const arrowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [searchValue, setSearchValue] = useState("");
  
  const options = useMemo(() => {
    const childs = Children.toArray(children) as ReactElement<SelectOptionProps>[];
    return childs.filter((child) => isValidElement<typeof Option>(child) && child.type === Option).map(child => child.props);
  }, [children]);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);


  useEffect(() => {
    if (!value) return;
    setInternalValue(multiple ? (value as Value[] || []) : value ? [value as Value] : []);
  }, [value]);

  useEffect(() => {
    setSelectedIndices(new Set(internalValue.map(v => options.findIndex(option => option.value === v))));
  }, [internalValue])

  const selectedLabels = useMemo(() => {
    console.log(internalValue, options);
    return internalValue.map(v => {
      const option = options.find(option => option.value === v);
      return option?.children || option?.label || "";
    });
  }, [internalValue, options]);

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

    const v = value;
    const _internalValue = options.some(option => option.value === v) ? [...internalValue, v] : internalValue.filter(value => value !== v);
    setInternalValue(_internalValue);
    onValueChange?.(multiple ? _internalValue as T : _internalValue[0] as T);
  }, []);

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

  const selectContext = useMemo(
    () => ({
      activeIndex,
      selectedIndices,
      getItemProps,
      handleSelect,
      searchValue,
      open: internalOpen || false
    }),
    [activeIndex, selectedIndices, getItemProps, handleSelect, searchValue]
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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div 
        ref={referenceRefs} 
        tabIndex={0} 
        className={tx(`
          items-center justify-center min-h-4 p-2 min-w-20 cursor-pointer rounded-md border
          border-solid border-gray-200 select-none relative`,
          className
        )}
        {...getReferenceProps({
          style
        })} 
      >
        {
          selectedLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))
        }
      </div>

      <SelectContext.Provider value={selectContext}>
      <AnimatePresence>
        <FloatingPortal root={root}>
          {internalOpen && (
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
                      gap-0.5 rounded-lg z-10 p-2 w-full inline-flex flex-col m-0
                      box-border subpixel-antialiased outline-none box-border bg-background [&_*]:box-border list-none max-h-[200px] overflow-y-auto
                    `)}
                  >
                    {searchable && (
                      <div className="py-2">
                        <input
                          tabIndex={1}
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder={placeholder}
                        className={tx(`
                          w-full bg-transparent border-none outline-none h-8 rounded-md
                          placeholder:text-gray-400 border-gray-200 border-1 border-solid
                          `)}
                        />
                      </div>
                    )}
                    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                      {children}
                    </FloatingList>
                  </ul>
                </m.div>
              </LazyMotion>
            </div>
          )}
        </FloatingPortal>
      </AnimatePresence>
      </SelectContext.Provider>
    </>
  );
}

export default Select;