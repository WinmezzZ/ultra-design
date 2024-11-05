import { Merge } from '@/types/generic';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, forwardRef as internalForwardRef, ReactElement } from 'react';


export const forwardRef = <
  Props = Record<string, any>,
  C extends ElementType = 'div',
>(
  render: (
    props: Merge<ComponentPropsWithoutRef<C>, Props>,
    ref?: ComponentPropsWithRef<C>['ref']
  ) => ReactElement | null
) => {
  return internalForwardRef(render);
};
