import { useListItem } from "@floating-ui/react";
import { useSelectContext } from "./select-context";
import { tx } from "@/utils/twind";
import { Value } from "@/types/value";

export type SelectOptionProps = {
  children: React.ReactNode;
  value: Value;
  disabled?: boolean;
}

export function Option(props: SelectOptionProps) {
  const { children, value, disabled } = props;
  const {
    activeIndex,
    selectedIndices,
    getItemProps,
    handleSelect
  } = useSelectContext();

  const { ref, index } = useListItem();
  const isActive = activeIndex === index;
  const isSelected = selectedIndices.has(index);

  return (
    <li
      ref={ref}
      role="option"
      aria-selected={isSelected}
      tabIndex={isActive ? 0 : -1}
      className={tx('py-1.5 px-2 w-full rounded-md', isActive && 'bg-primary-100', isSelected && 'bg-primary-500 text-white', disabled && 'cursor-not-allowed text-gray-400')}
      {...getItemProps({
        onClick: () => handleSelect(index, value)
      })}
    >
      {children}
    </li>
  );
}