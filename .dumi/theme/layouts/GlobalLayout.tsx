import ConfigProvider from '@/config-provider/config-provider';
import { useOutlet, usePrefersColor } from 'dumi';
import { ReactElement } from 'react';

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const [color] = usePrefersColor();
  return <ConfigProvider theme={color} primaryColor="#a855f7">
    <div>
      <style>{`
        .dumi-default-previewer-demo button {
              margin-left: 8px;
          }
          .dumi-default-header,
          .dumi-default-sidebar,
          .dumi-default-content-footer,
          .dumi-default-footer {
              display: none;
          }
        `}
      </style>
        {outlet as ReactElement}
      </div>
    </ConfigProvider>
  ;
};

export default GlobalLayout;
