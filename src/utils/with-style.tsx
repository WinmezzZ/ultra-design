import { ComponentProps, ComponentType, forwardRef, useEffect } from 'react';
// import { injectGlobal, tw } from './twind';

export const withStyle = <T extends ComponentType<any>>(Component: T) => {
  const StyledComponent = forwardRef<any, ComponentProps<T>>((props, ref) => {
    StyledComponent.displayName = Component.displayName;

   
  useEffect(() => {
    // injectGlobal(tw(`
    //     :root {
    //       --background: #ffffff;
    //       --foreground: #1a1a1a;
    //       --card: #ffffff;
    //       --card-foreground: #1a1a1a;
    //       --popover: #ffffff;
    //       --popover-foreground: #1a1a1a;
    //       --primary: #3399ff;
    //       --primary-foreground: #d6e6ff;
    //       --secondary: #ccd9ff;
    //       --secondary-foreground: #3b3b3b;
    //       --muted: #ccd9ff;
    //       --muted-foreground: #6e6e6e;
    //       --accent: #ccd9ff;
    //       --accent-foreground: #3b3b3b;
    //       --destructive: #ff4d4d;
    //       --destructive-foreground: #d6e6ff;
    //       --border: #d9e6ff;
    //       --input: #d9e6ff;
    //       --ring: #3399ff;
    //       --radius: rem;
    //       --chart-1: #ff4d4d;
    //       --chart-2: #66cc66;
    //       --chart-3: #4d6666;
    //       --chart-4: #ffb366;
    //       --chart-5: #ffdb4d;
    //     }

    //     .dark {
    //       --background: #1a1a1a;
    //       --foreground: #d6e6ff;
    //       --card: #1a1a1a;
    //       --card-foreground: #d6e6ff;
    //       --popover: #1a1a1a;
    //       --popover-foreground: #d6e6ff;
    //       --primary: #3b3b3b;
    //       --primary-foreground: #d6e6ff;
    //       --secondary: #2c2c2c;
    //       --secondary-foreground: #d6e6ff;
    //       --muted: #2c2c2c;
    //       --muted-foreground: #a6a6a6;
    //       --accent: #2c2c2c;
    //       --accent-foreground: #d6e6ff;
    //       --destructive: #4d4d4d;
    //       --destructive-foreground: #d6e6ff;
    //       --border: #2c2c2c;
    //       --input: #2c2c2c;
    //       --ring: #3b3b3b;
    //       --chart-1: #3333ff;
    //       --chart-2: #339966;
    //       --chart-3: #ff9933;
    //       --chart-4: #9933ff;
    //       --chart-5: #ff3399;
    //     }
    //   `))
  }, [])

    return <Component {...props as any} ref={ref} />;
  });


  return StyledComponent
};
