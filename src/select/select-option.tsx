import { useListItem } from "@floating-ui/react";
import { useSelectContext } from "./select-context";
import { tx } from "@/utils/twind";
import { Value } from "@/types/value";

export type SelectOptionProps = {
  children: React.ReactNode;
  value: Value;
  disabled?: boolean;
  /** 启用搜索时当 option children 不为字符串时，需要指定 label */
  label?: string;
}

export function Option(props: SelectOptionProps) {
  const { children, value, disabled, label } = props;
  const {
    activeIndex,
    selectedIndices,
    getItemProps,
    handleSelect,
    searchValue,
  } = useSelectContext();

  const { ref, index } = useListItem({ label: typeof children === "string" ? children : label });

  const isVisible = !searchValue || 
    (typeof children === 'string' && children.toLowerCase().includes(searchValue.toLowerCase()));

  if (!isVisible) {
    return null;
  }

  const isActive = activeIndex === index;
  const isSelected = selectedIndices.has(index);

  return (
    <li
      ref={ref}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={tx('py-1.5 px-2 w-full rounded-md', isActive && 'bg-primary-100', isSelected && 'bg-primary-500 text-white', disabled && 'cursor-not-allowed text-gray-400')}
      {...getItemProps({
        onClick: () => {
            handleSelect(index, value);
        }
      })}
    >
      {children}
    </li>
  );
}