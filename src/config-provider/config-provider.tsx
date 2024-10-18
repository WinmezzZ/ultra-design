import _ from 'lodash-es';
import { createContext, FC, ReactNode } from 'react';

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger';

export interface ComponentCommonProps {
  size: Size;
  theme: 'light' | 'dark'
  children: ReactNode
}

export interface ConfigProviderProps  {}

const configContextOptions = {};

export const ConfigContext = createContext<ConfigProviderProps>(configContextOptions);

const ConfigProvider: FC<ComponentCommonProps> = ((props) => {
  const { children, ...rest } = props;

  const config: ConfigProviderProps = _.merge({}, configContextOptions, rest);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
});

export default ConfigProvider;