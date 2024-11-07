import { createContext, useContext } from "react";
import { useInteractions } from "@floating-ui/react";
import { Value } from "@/types/value";

export type SelectContextProps = {
  activeIndex: number | null;
  selectedIndices: Set<number>;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number, value: Value) => void;
}

export const SelectContext = createContext<SelectContextProps>(
  {} as SelectContextProps
);

export const useSelectContext = () => useContext<SelectContextProps>(SelectContext);