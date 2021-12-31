import React, { useEffect } from 'react';

type Ref<T> = React.RefObject<T>;

interface Callback {
  (event: Event): void;
}

export function useClickOutSide<T extends HTMLElement | undefined>(ref: Ref<T>, callback: Callback) {
  useEffect(() => {
    const clickEvent = (e: MouseEvent) => {
      const el = ref.current;

      if (!el?.contains) {
        return;
      }
      if (el.contains(e.target as Node)) {
        return;
      }

      callback(e);
    };

    document.addEventListener('click', clickEvent);

    return () => {
      document.removeEventListener('click', clickEvent);
    };
  }, [ref.current, callback]);
}
