import { ComponentCommonProps } from '../config-provider';
import { useConfigContext } from '../config-provider/useConfigContext';
import { buttonStyles } from './button-style';
import React from 'react';
import Ripple from '../ripple/ripple';

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger';

export type ButtonType = 'primary' | 'dashed' | 'text' | 'default';

export interface BaseButtonProps {
  /**
   * @description.zh-CN 按钮类型
   * @description.en-US button type
   * @default 'default'
   */
  type?: ButtonType;

  /**
   * @description.zh-CN 开启涟漪效果
   * @description.en-US enable ripple effect
   * @default true
   */
  effect?: boolean;
}

export interface ButtonProps extends Partial<ComponentCommonProps>, React.PropsWithChildren<BaseButtonProps> {}

const ButtonComponent: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const { children, effect, type, ...rest } = props;
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  const rippleElement = effect && type !== 'text' ? <Ripple /> : null;

  return (
    <button ref={ref as any} css={buttonStyles(styleProps)} {...rest}>
      {children}
      {rippleElement}
    </button>
  );
};

const Button = React.forwardRef(ButtonComponent);

Button.defaultProps = {
  effect: true,
};

export default Button;
