import { ChangeEvent, InputHTMLAttributes, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { withStyle } from "@/utils/with-style";
import { tx } from "@/utils/twind";
import { useCheckboxGroup } from "./checkbox-context";

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  value?: string | number;
  defaultChecked?: boolean;
  onValueChange?: (value: boolean) => void;
}

const Checkbox = withStyle((props: CheckboxProps) => {
  const { children, checked, defaultChecked, disabled, onValueChange, value = '', ...rest } = props;
  const { value: groupValue = [], inGroup, updateValue, disabled: groupDisabled } = useCheckboxGroup();
  const [isChecked, setIsChecked] = useState(defaultChecked ?? false);
  const isDisabled = inGroup ? groupDisabled : disabled;

  const id = useId();

  useEffect(() => {
    if (!groupValue || !value) return;
    const next = groupValue.includes(value);

    if (next === isChecked) return;
    setIsChecked(next);
  }, [groupValue.join(',')]);

  useEffect(() => {
    if (checked === undefined) return;
    setIsChecked?.(checked);
  }, [checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    if (inGroup) {
      updateValue?.(value, e.target.checked);
    }

    setIsChecked(e.target.checked);
    onValueChange?.(e.target.checked);
  };

  console.log(isChecked)

  return (
    <div className={tx('group flex items-center peer-disabled:(opacity-50 cursor-not-allowed)')} >
      <button className={tx('relative flex items-center bg-transparent border-none')} type="button">
        <input
          type="checkbox"
          className={tx('peer border-(2px solid border) group-hover:scale-105 relative h-5 w-5 cursor-pointer appearance-none rounded-md transition-all duration-500 checked:(border-primary-500 checked:bg-primary-500)')}
          onChange={handleChange}
          id={id}
          disabled={isDisabled}
          checked={isChecked}
          {...rest}
        />
        <div className={tx('pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white')}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3.5"
          stroke="currentColor"
          className={tx('h-3.5 w-3.5')}
          initial={false}
          animate={isChecked ? "checked" : "unchecked"}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
            variants={tickVariants}
          />
        </motion.svg>
        </div>
      </button>
      <label
        className={tx('relative ml-2 overflow-hidden text-sm select-none')}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
});

export default Checkbox;