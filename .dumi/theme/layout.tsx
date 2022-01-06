import React, { FC, useMemo } from 'react';
import Layout from 'dumi-theme-default/src/layout';
import { ConfigProvider } from '../../components';
import { usePrefersColor } from 'dumi/theme';

type ThemeMode = 'dark' | 'light';

const themes: ThemeMode[] = ['dark', 'light'];

const CustomLayout: FC<any> = ({ children, ...props }) => {
  const [color] = usePrefersColor();

  const themeMode = useMemo(() => {
    return themes.includes(color as ThemeMode)
    ? color as ThemeMode
    : (document.querySelector('html').getAttribute('data-prefers-color') as 'dark' | 'light')
  }, [color])

  if (!color) return null

  return (
    <ConfigProvider theme={{ mode: themeMode }}>
      <Layout {...props}>{children}</Layout>
    </ConfigProvider>
  );
};

export default CustomLayout;
