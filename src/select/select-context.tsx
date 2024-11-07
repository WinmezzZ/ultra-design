import { createContext, useContext } from "react";
import { useInteractions } from "@floating-ui/react";

export type SelectContextProps = {
  activeIndex: number | null;
  selectedIndices: Set<number>;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: (index: number) => void;
}

export const SelectContext = createContext<SelectContextProps>(
  {} as SelectContextProps
);

export const useSelectContext = () => useContext<SelectContextProps>(SelectContext);