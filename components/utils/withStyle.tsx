import { css } from '@emotion/react';
import { forwardRef, useContext } from 'react';
import { ConfigProviderProps } from '../config-provider';
import { ConfigContext } from '../config-provider/config-provider';

const style = (_props: ConfigProviderProps) => {
  // const { theme } = props;
  // const { mode } = theme;

  return css`
    * {
      box-sizing: border-box;
    }
    box-sizing: border-box;
    font-size: 14px;
    ul,
    li {
      margin: 0;
      padding: 0;
      text-decoration: none;
    }
  `;
};

const withStyle = <T, P>(Component: React.ComponentType<P & { ref?: React.Ref<T> }>) => {
  const StyledComponent = forwardRef<T, P>((props, ref) => {
    const configContext = useContext<ConfigProviderProps>(ConfigContext);

    return <Component css={style(configContext)} {...props} ref={ref} />;
  });

  return StyledComponent;
};

export default withStyle;
