import React, { FC, useMemo } from 'react';
import Layout from 'dumi-theme-default/src/layout';
import { ConfigProvider } from '../../components';
import { usePrefersColor } from 'dumi/theme';
import { useColorScheme } from '@winme/react-hooks';

const CustomLayout: FC<any> = ({ children, ...props }) => {
  const [color] = usePrefersColor();
  const systemColor = useColorScheme();

  return (
    <ConfigProvider theme={{ mode: color === 'auto' ? systemColor :  color }}>
      <Layout {...props}>{children}</Layout>
    </ConfigProvider>
  );
};

export default CustomLayout;
