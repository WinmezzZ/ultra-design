import { createContext, FC } from 'react';
import { defaultTheme, Theme } from './theme';

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger';

export interface ComponentCommonProps {
  /**
   * @description.zh-CN 尺寸
   * @description.en-US size
   * @default 'middle'
   */
  size?: Size;
}

export interface ConfigCommonOptions {
  /**
   * @description.zh-CN 主题色
   * @description.en-US theme color
   */
  theme?: Theme;
}

export const componentDefaultProps: ComponentCommonProps = {
  size: 'middle',
};

const configCommonOptions: ConfigCommonOptions = {
  theme: defaultTheme,
};

export interface ConfigContextOptions extends ComponentCommonProps, ConfigCommonOptions {}

const configContextOptions = {
  ...componentDefaultProps,
  ...configCommonOptions,
};

export const ConfigContext = createContext<ConfigContextOptions>(configContextOptions);

const ConfigProvider: FC<Partial<ConfigContextOptions>> = props => {
  const { children, ...rest } = props;

  const config: ConfigContextOptions = { ...configContextOptions, ...rest };

  console.log(config);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
