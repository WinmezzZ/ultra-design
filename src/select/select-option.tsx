import { forwardRef } from "@/utils/forwardRef";

export type SelectOptionProps = {
  children: React.ReactNode;
  value: string | number | symbol;
  disabled?: boolean;
}

const SelectOption = forwardRef<SelectOptionProps, 'li'>((props, ref) => {
  const { children, value, disabled, ...rest } = props;

  return <li ref={ref} {...rest}>{children}</li>;
});

export default SelectOption;


function Option({ label }: { label: string }) {
  const {
    activeIndex,
    selectedIndex,
    getItemProps,
    handleSelect
  } = React.useContext(SelectContext);

  const { ref, index } = useListItem({ label });

  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
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