import { Color } from "@/types/color";
import { Size } from "@/types/size";
import { createContext, useContext } from "react";

export interface CheckboxGroupContextProps {
  inGroup?: boolean;
  size?: Size;
  color?: Color;
  disabled?: boolean;
  value?: (string | number)[];
  updateValue?: (value: (string | number), checked: boolean) => void;
}


export const CheckboxGroupContext = createContext<CheckboxGroupContextProps>({
  inGroup: true,
  disabled: false,
  value: [],
  updateValue: () => {},
});

export const useCheckboxGroup = () => useContext<CheckboxGroupContextProps>(CheckboxGroupContext);