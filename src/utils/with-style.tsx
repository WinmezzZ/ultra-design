import { ComponentType, forwardRef, useContext, useEffect } from 'react';
import { injectGlobal } from './twind';
import { usePrimaryColor } from './use-primary-color';
import { ConfigContext, ConfigProviderProps } from '@/config-provider/config-provider';

export const withStyle = <T, P = Record<string, any>>(Component: ComponentType<P>) => {
  return forwardRef<T, P>((props, ref) => {
    const { primaryColor } = useContext<ConfigProviderProps>(ConfigContext);
    const colorPalette = usePrimaryColor(primaryColor);

    useEffect(() => {
      if (colorPalette) {
        const primary = colorPalette.primary;
        document.documentElement.style.setProperty('--primary', primary['500']);
        Object.entries(primary).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--primary-${key}`, value);
        });
      }
    }, [colorPalette])

    useEffect(() => {
      if (document.documentElement.style.getPropertyValue('--ud-global-inject')) return;
      injectGlobal(`
        :root {
          --ud-global-inject: true;
          --background: #ffffff;
          --foreground: #1a1a1a;
          --primary: #006FEE;
          --border: #d9e6ff;
          --border-width-small: 1px;
          --border-width-medium: 2px;
          --border-width-large: 3px;
          --input: #d9e6ff;
          --ring: #3399ff;
          --radius: rem;
        }
      `)
    }, [])

    return <Component {...(props as P)} ref={ref} />;
  })
};
