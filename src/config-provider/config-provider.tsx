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

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', config.theme === 'dark');
  }, [config.theme]);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
});

export default ConfigProvider;