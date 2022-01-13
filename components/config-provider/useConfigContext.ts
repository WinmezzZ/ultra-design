import { useContext } from 'react';
import { ConfigContext, ConfigProviderProps } from './config-provider';

export function useConfigContext() {
  const value = useContext<ConfigProviderProps>(ConfigContext);

  return value;
}
