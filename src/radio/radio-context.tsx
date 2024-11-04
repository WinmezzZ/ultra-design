import { Color } from "@/types/color";
import { Size } from "@/types/size";
import { createContext, useContext } from "react";

export interface RadioGroupContextProps {
  inGroup?: boolean;
  size?: Size;
  color?: Color;
  disabled?: boolean;
  value?: (string | number);
  updateValue?: (value: (string | number)) => void;
}


export const RadioGroupContext = createContext<RadioGroupContextProps>({
  inGroup: false,
  disabled: false,
  updateValue: () => {},
});

export const useRadioGroup = () => useContext<RadioGroupContextProps>(RadioGroupContext);