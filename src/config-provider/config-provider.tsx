import { injectGlobal } from '@/utils/twind';
import { usePrimaryColor } from '@/utils/use-primary-color';
import _ from 'lodash-es';
import {  createContext, FC, ReactElement,  useEffect } from 'react';

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger';

export interface ComponentCommonProps {
  size?: Size;
  theme?: 'light' | 'dark'
  primaryColor?: string
}

export type ConfigProviderProps = ComponentCommonProps

const configContextOptions = {
  theme: 'light',
  primaryColor: '#006FEE'
} as const;

export const ConfigContext = createContext<ConfigProviderProps>(configContextOptions);

const ConfigProvider: FC<ComponentCommonProps & { children: ReactElement }> = ((props) => {
  const { children, ...rest } = props;

  const config: ConfigProviderProps = _.merge({}, configContextOptions, rest);

  const colorPalette = usePrimaryColor(props.primaryColor);

  useEffect(() => {
    if (colorPalette) {
      const primary = colorPalette.primary;
  
      injectGlobal(`
        :root {
          --primary: ${primary['500']} !important;
          ${Object.entries(primary).map(([key, value]) => `--primary-${key}: ${value};`).join('\n')}
        }
      `)
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
        --border-width-small: 1px;
        --border-width-medium: 2px;
        --border-width-large: 3px;
        --input: #d9e6ff;
        --ring: #3399ff;
        --radius: rem;
      }
      .dark {
        --background: #000000;
        --foreground: #ffffff;
      }

      * {
        box-sizing: border-box;
      }
    `)
  }, [])

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', config.theme === 'dark');
  }, [config.theme]);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
});

export default ConfigProvider;