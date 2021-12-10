import PropTypes from 'prop-types';
import { ComponentCommonProps, componentDefaultProps } from '../../components/config-provider';
import { useConfigContext } from '../../components/config-provider/useConfigContext';
import { FC } from 'react';

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger';

export interface ButtonProps extends ComponentCommonProps {}

const Button: FC<ButtonProps> = props => {
  const { children, ...commonProps } = props;

  const configContext = useConfigContext();

  const commonContext = { ...configContext, ...commonProps };

  return <button>{children}</button>;
};

Button.defaultProps = {
  ...componentDefaultProps,
};

export default Button;
