import _ from 'lodash-es';
import { cloneElement, createContext, forwardRef, isValidElement, useEffect } from 'react';
import en_US from '../locale/en_US';
import Modal from '../modal';
import Toast from '../toast';
import { Locale } from './locale';
import { defaultTheme, Theme } from './theme';

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger';

export interface ComponentCommonProps {
  /**
   * @description.zh-CN 尺寸
   * @description.en-US size
   * @default 'middle'
   */
  size: Size;
}

export interface ConfigCommonOptions {
  /**
   * @description.zh-CN 主题色
   * @description.en-US theme color
   */
  theme: Theme;
  /**
   * @description.zh-CN 地区
   * @description.en-US region locale
   */
  locale: Locale;
}

export const componentDefaultProps: ComponentCommonProps = {
  size: 'middle',
};

const configCommonOptions: ConfigCommonOptions = {
  theme: defaultTheme,
  locale: en_US,
};

export interface ConfigProviderProps extends ComponentCommonProps, ConfigCommonOptions {}

const configContextOptions = {
  ...componentDefaultProps,
  ...configCommonOptions,
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const ConfigContext = createContext<ConfigProviderProps>(configContextOptions);

export type PartialProviderConfig = DeepPartial<ConfigProviderProps>;

const ConfigProvider = forwardRef((props, ref) => {
  const { children, ...rest } = props;

  const config: ConfigProviderProps = _.merge({}, configContextOptions, rest);

  useEffect(() => {
    Toast.config(config);
    Modal.config(config);
  }, [props]);

  if (!isValidElement(children)) return null;

  return <ConfigContext.Provider value={config}>{cloneElement(children, { ref })}</ConfigContext.Provider>;
});

export default ConfigProvider;
