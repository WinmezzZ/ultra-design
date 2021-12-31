import React from 'react';

export const mergeRef = <T>(...refs: Array<React.Ref<T>>) => {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as any).current = value;
      }
    });
  };
};

export const useMergedRef = <T>(...refs: React.Ref<T>[]): React.RefCallback<T> => {
  return React.useCallback((element: T) => {
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];

      if (typeof ref === 'function') ref(element);
      else if (ref && typeof ref === 'object') (ref as React.MutableRefObject<T>).current = element;
    }
  }, refs);
};
