import { css } from '@emotion/react';
import { FC, forwardRef, ReactNode, useContext } from 'react';
import { ConfigProviderProps } from '../config-provider';
import { ConfigContext } from '../config-provider/config-provider';

const style = (props: ConfigProviderProps) => {
  const { theme } = props;
  const { primaryColor } = theme.style;

  return css`
    * {
      box-sizing: border-box;
    }
    box-sizing: border-box;
    font-size: 14px;
    ul,
    li {
      text-decoration: none;
    }

    a {
      color: ${primaryColor};
    }

    .i-icon {
      display: inline-flex;
      align-items: center;
    }
  `;
};

const withStyle = <T, P>(Component: React.ComponentType<P & { ref?: React.Ref<T> }>) => {
  const StyledComponent = forwardRef<T, P & { children?: ReactNode }>((props, ref) => {
    const configContext = useContext<ConfigProviderProps>(ConfigContext);

    return <Component css={style(configContext)} {...props} ref={ref} />;
  });

  StyledComponent.displayName = Component.displayName;

  return StyledComponent as FC<P>;
};

export default withStyle;
