import { Color } from "@/types/color";
import { Orientation } from "@/types/orientation";
import { Size } from "@/types/size";
import { tx } from "@/utils/twind";
import { forwardRef } from "@/utils/forwardRef";
import {  useEffect, useMemo, useState } from "react";
import { RadioGroupContext } from "./radio-context";


export interface RadioGroupProps {
  size?: Size;
  color?: Color;
  disabled?: boolean;
  value?: (string | number);
  defaultValue?: (string | number);
  orientation?: Orientation;
  onValueChange?: (value: (string | number)) => void;
  children?: React.ReactNode;
}

const RadioGroup = forwardRef<RadioGroupProps>((props) => {
  const { value,  defaultValue, onValueChange, children, orientation, ...rest } = props;
  const [selfVal, setSelfVal] = useState(defaultValue);

  const handleChange = (val: (string | number)) => {
    setSelfVal(val);
    onValueChange?.(val);
  };

  useEffect(() => {
    if (!value) return;
    setSelfVal(value);
  }, [value])

  const group = useMemo(() => ({
    value: selfVal,
    updateValue: handleChange,
    inGroup: true
  }), [selfVal, handleChange]);

  return (
    <div className={tx('flex flex-col gap-2', orientation === 'horizontal' && 'flex-row')} {...rest}>
      <RadioGroupContext.Provider value={group}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
});

export default RadioGroup;
