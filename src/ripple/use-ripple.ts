import { uuid } from "@/utils/uuid";
import { useState } from "react";

import { Key, useCallback } from "react";

export type RippleType = {
  key: Key;
  x: number;
  y: number;
  size: number;
};

export const useRipple = () => {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const onClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    setRipples([...ripples, { key: uuid(), x, y, size }]);
  };

  const onClear = useCallback((key: React.Key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key));
  }, []);
   
   
  return { ripples, onClick, onClear };
}