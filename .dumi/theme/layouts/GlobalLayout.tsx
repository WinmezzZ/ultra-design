import ConfigProvider from '@/config-provider/config-provider';
import { useOutlet, usePrefersColor } from 'dumi';
import { ReactElement } from 'react';

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const [color] = usePrefersColor();

  // return <ConfigProvider theme={color}>{outlet as ReactElement}</ConfigProvider>;
  return outlet;
};

export default GlobalLayout;
