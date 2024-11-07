import { isFunction } from 'lodash-es';
import type { MutableRefObject, Ref, RefCallback } from 'react';
import { useCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

export const assignRef = <T>(ref: PossibleRef<T>, value: T) => {
  if (isFunction(ref)) {
    ref(value);
  // eslint-disable-next-line eqeqeq
  } else if (ref != null) {
    (ref as MutableRefObject<T>).current = value;
  }
};

export const mergeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) => refs.forEach((ref) => assignRef(ref, node));
};

export const useMergedRefs = <T>(...refs: PossibleRef<T>[]) => {
  return useCallback(mergeRefs(...refs), refs) as RefCallback<T>;
};