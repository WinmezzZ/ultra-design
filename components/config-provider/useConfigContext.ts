import { useContext } from 'react';
import { ConfigContext, ConfigContextOptions } from '.';

export function useConfigContext() {
  const value = useContext<ConfigContextOptions>(ConfigContext);

  return value;
}
