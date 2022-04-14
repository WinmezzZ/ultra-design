import { assign, assignWith, isUndefined } from 'lodash-es';
import { useContext } from 'react';
import { ConfigProviderProps } from '../config-provider';
import { ConfigContext } from '../config-provider/config-provider';

export function mergeProps<A, B>(a: A, b: B): B & A;
export function mergeProps<A, B, C>(a: A, b: B, c: C): C & B & A;
export function mergeProps(...items: any[]) {
  function customizer(objValue: any, srcValue: any) {
    return isUndefined(srcValue) ? objValue : srcValue;
  }

  let ret = assign({}, items[0]);

  for (let i = 1; i < items.length; i++) {
    ret = assignWith(ret, items[i], customizer);
  }

  return ret;
}

export function useMergeProps<A, B>(defaultProps: A, props: B) {
  const configContext = useContext<ConfigProviderProps>(ConfigContext);

  return mergeProps(defaultProps, configContext, props);
}
