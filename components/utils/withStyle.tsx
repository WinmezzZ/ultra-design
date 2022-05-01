import { css } from '@emotion/react';
import { forwardRef, PropsWithChildren, useContext } from 'react';
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

    .i-icon {
      display: inline-flex;
      align-items: center;
    }
  `;
};

const withStyle = <T, P>(Component: React.ComponentType<P & { ref?: React.Ref<T> }>) => {
  const StyledComponent = forwardRef<T, PropsWithChildren<P>>((props, ref) => {
    const configContext = useContext<ConfigProviderProps>(ConfigContext);

    return <Component css={style(configContext)} {...props} ref={ref} />;
  });

  StyledComponent.displayName = Component.displayName;

  return StyledComponent;
};

export default withStyle;
