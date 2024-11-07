import {
  autoUpdate,
  flip,
  useFloating,
  useInteractions,
  useListNavigation,
  useTypeahead,
  useClick,
  useListItem,
  useDismiss,
  useRole,
  FloatingFocusManager,
  FloatingList
} from "@floating-ui/react";
import { ReactNode, useState, useRef, useCallback, useMemo, useContext } from "react";
import { SelectContext } from "./select-context";

export function Select({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(new Set());

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [flip()]
  });

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

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
    if (isOpen) {
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

  return (
    <>
      <div ref={refs.setReference} tabIndex={0} {...getReferenceProps()}>
        {Array.from(selectedLabels).join(", ") || "Select..."}
      </div>
      <SelectContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {children}
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </SelectContext.Provider>
    </>
  );
}

export function Option({ label }: { label: string }) {
  const {
    activeIndex,
    selectedIndices,
    getItemProps,
    handleSelect
  } = useContext(SelectContext);

  const { ref, index } = useListItem({ label });

  const isActive = activeIndex === index;
  const isSelected = selectedIndices.has(index);

  return (
    <button
      type="button"
      ref={ref}
      role="option"
      aria-selected={isSelected}
      tabIndex={isActive ? 0 : -1}
      style={{
        background: isActive ? "cyan" : "",
        fontWeight: isSelected ? "bold" : ""
      }}
      {...getItemProps({
        onClick: () => handleSelect(index)
      })}
    >
      {label}
    </button>
  );
}
