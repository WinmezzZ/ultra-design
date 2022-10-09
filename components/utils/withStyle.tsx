import { css } from '@emotion/react';
import { ComponentType, forwardRef, ForwardRefExoticComponent, RefAttributes, useContext } from 'react';
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

const withStyle = <T extends ComponentType<any>>(Component: T) => {
  const StyledComponent = forwardRef<any, any>((props, ref) => {
    const configContext = useContext<ConfigProviderProps>(ConfigContext);

    return <Component css={style(configContext)} {...props} ref={ref} />;
  });

  StyledComponent.displayName = Component.displayName;

  type TP = T extends ComponentType<infer P & { ref?: React.Ref<infer T> }> ? { t: T; p: P } : any;

  return StyledComponent as TP['t'] extends Record<any, any>
    ? ForwardRefExoticComponent<TP['p'] & RefAttributes<TP['t']>>
    : T;
};

export default withStyle;
