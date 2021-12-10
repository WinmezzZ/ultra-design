import { createContext, FC } from 'react';
import { Theme } from './theme';

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger';

export interface ComponentCommonProps {
  /**
   * @description.zh-CN 主题色
   * @description.en-US theme color
   */
  theme?: Theme;
  /**
   * @description.zh-CN 尺寸
   * @description.en-US size
   * @default 'middle'
   */
  size?: Size;
}

export const componentDefaultProps: ComponentCommonProps = {
  theme: {
    mode: 'light',
  },
  size: 'middle',
};

export interface ConfigContextOptions extends ComponentCommonProps {}

const configContextOptions = {
  ...componentDefaultProps,
};

export const ConfigContext = createContext<ConfigContextOptions>(configContextOptions);

const ConfigProvider: FC<ConfigContextOptions> = props => {
  const { children, ...rest } = props;

  const config: ConfigContextOptions = { ...configContextOptions, ...rest };

  console.log(config);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
