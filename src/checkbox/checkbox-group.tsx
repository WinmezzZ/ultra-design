import { Color } from "@/types/color";
import { Orientation } from "@/types/orientation";
import { Size } from "@/types/size";
import { tx } from "@/utils/twind";
import { forwardRef } from "@/utils/forwardRef";
import {  useEffect, useMemo, useState } from "react";
import { CheckboxGroupContext } from "./checkbox-context";


export interface CheckboxGroupProps {
  size?: Size;
  color?: Color;
  disabled?: boolean;
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  orientation?: Orientation;
  onValueChange?: (value: (string | number)[]) => void;
  children?: React.ReactNode;
}

const CheckboxGroup = forwardRef<CheckboxGroupProps>((props) => {
  const { value,  defaultValue, onValueChange, children, orientation, ...rest } = props;
  const [selfVal, setSelfVal] = useState<(string | number)[]>(defaultValue || []);

  const handleChange = (val: (string | number), checked: boolean) => {
    const removed = selfVal.filter(v => v !== val);
    const next = checked ? [...removed, val] : removed;

    setSelfVal(next);
    onValueChange?.(next);
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
      <CheckboxGroupContext.Provider value={group}>
        {children}
      </CheckboxGroupContext.Provider>
    </div>
  );
});

export default CheckboxGroup;
