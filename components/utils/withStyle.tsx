import { css } from '@emotion/react';
import { FC, useContext } from 'react';
import { ConfigProviderProps } from '../config-provider';
import { ConfigContext } from '../config-provider/config-provider';

const style = (props: ConfigProviderProps) => {
  const { theme } = props;
  const { mode } = theme;

  return css`
    * {
      box-sizing: border-box;
    }
    box-sizing: border-box;
    color: ${theme[mode].textColor};
  `;
};

const withStyle = (Component: FC<any>) => {
  const StyledComponent: FC = props => {
    const configContext = useContext<ConfigProviderProps>(ConfigContext);

    return <Component css={style(configContext)} {...props} />;
  };

  return StyledComponent;
};

export default withStyle;
