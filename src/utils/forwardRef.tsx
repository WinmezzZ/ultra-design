import { PropsWithoutRef, ComponentPropsWithRef, ElementType, forwardRef as internalForwardRef, ReactElement } from 'react';


export const forwardRef = <
  Props = Record<string, any>,
  Tag extends ElementType = 'div',
>(
  render: (
    props: PropsWithoutRef<Props>,
    ref?: ComponentPropsWithRef<Tag>['ref']
  ) => ReactElement | null
) => {
  return internalForwardRef(render);
};
