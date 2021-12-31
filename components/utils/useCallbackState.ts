import { useRef, useState, useEffect, SetStateAction } from 'react';

interface Callback<S> {
  (state: S): void;
}

interface ReturnCallback<S> {
  (state: SetStateAction<S>, callback?: Callback<S>): void;
}

export function useCallbackState<T>(initState: T): [T, ReturnCallback<T>] {
  const cbRef = useRef<Callback<T>>();
  const [state, setState] = useState(initState);

  useEffect(() => {
    cbRef.current?.(state);
  }, [state]);

  return [
    state,
    function setAndCallback(state: SetStateAction<T>, callback?: Callback<T>) {
      cbRef.current = callback;
      setState(state);
    },
  ];
}
