import { ComponentCommonProps } from '../../components/config-provider';
import { useConfigContext } from '../../components/config-provider/useConfigContext';
import { FC } from 'react';
import { buttonStyles } from './button-style';

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger';

export type ButtonType = 'primary' | 'dashed' | 'text' | 'default';

export interface ButtonProps extends ComponentCommonProps {
  /**
   * @description.zh-CN 按钮类型
   * @description.en-US button type
   * @default 'default'
   */
  type?: ButtonType;
}

const Button: FC<ButtonProps> = props => {
  const { children, ...commonProps } = props;

  const configContext = useConfigContext();

  const commonContext = { ...configContext, ...commonProps };

  const styleProps = { ...configContext, ...props };

  return <button css={buttonStyles(styleProps)}>{children}</button>;
};

export default Button;
