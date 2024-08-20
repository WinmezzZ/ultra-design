import { ComponentProps, ComponentType, forwardRef } from 'react';

export const withStyle = <T extends ComponentType<any>>(Component: T) => {
  const StyledComponent = forwardRef<any, ComponentProps<T>>((props, ref) => {

    return <Component {...props as any} ref={ref} />;
  });

  StyledComponent.displayName = Component.displayName;

  return StyledComponent
};
