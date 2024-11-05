import { InputHTMLAttributes, ReactNode, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import { forwardRef } from "@/utils/forwardRef";
import { tx } from "@/utils/twind";
import { useRadioGroup } from "./radio-context";

export interface RadioProps extends InputHTMLAttributes<HTMLSpanElement> {
  checked?: boolean;
  value?: string | number;
  defaultChecked?: boolean;
  onValueChange?: (checked: boolean) => void;
  children?: ReactNode;
}

const Radio = forwardRef<RadioProps>((props) => {
  const { children, checked, defaultChecked, disabled, onValueChange, value = '', ...rest } = props;
  const { value: groupValue, inGroup, updateValue, disabled: groupDisabled } = useRadioGroup();
  const [isChecked, setIsChecked] = useState(defaultChecked ?? false);
  const isDisabled = inGroup ? groupDisabled : disabled;
  const id = useId();

  useEffect(() => {
    if (!value || !inGroup) return;

    setIsChecked(value === groupValue);
  }, [value, inGroup, groupValue]);

  useEffect(() => {
    if (checked === undefined) return;
    setIsChecked?.(checked);
  }, [checked]);

  const handleChange = () => {
    if (isDisabled) return;
    if (inGroup) {
      updateValue?.(value);
      return
    }

    setIsChecked(value === groupValue);
    onValueChange?.(value === groupValue);
  };

  return (
    <span className={tx('group inline-flex items-center cursor-pointer pr-2', isDisabled && 'disabled !cursor-not-allowed')} {...rest}>
      <span className={tx('relative flex items-center bg-transparent border-none')}>
        <input
          type="radio"
          className={tx('group~radio z-[-1]')}
          onChange={handleChange}
          id={id}
          disabled={isDisabled}
          checked={isChecked}
        />
        <div className={tx('pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white')}>
          <motion.svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 40 40"
            className={tx('w-[20px] h-[20px] flex justify-center items-center')}
            initial={false}
            animate={isChecked ? "checked" : "unchecked"}
          >
            <circle
              cx="20"
              cy="20"
              r="17"
              z="1"
              fill="none"
              strokeWidth="3"
              className={tx('stroke-gray-300')}
            />
            <motion.circle
              cx="20"
              cy="20"
              r="17"
              z="2"
              fill="none"
              strokeWidth="3"
              className={tx('stroke-primary group-[.disabled]:stroke-gray-300')}
              variants={{
                checked: {
                  pathLength: 1.1,
                  transition: { delay: 0.1, type: "spring", duration: 0.5, bounce: 0 },
                },
                unchecked: { pathLength: 0 },
              }}
            />
            <circle
              cx="20"
              cy="20"
              r="8"
              z="2"
              strokeWidth="0"
              className={tx('group-[.disabled]:fill-gray-300', isChecked ? 'fill-primary opacity-100' : 'fill-gray-300 opacity-0')}
            />
          </motion.svg>
        </div>
      </span>
      <label
        className={tx('relative ml-2 overflow-hidden text-sm select-none')}
        htmlFor={id}
      >
        {children}
      </label>
    </span>
  );
});

export default Radio;