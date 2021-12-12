import { ComponentCommonProps } from '../config-provider';
import { useConfigContext } from '../config-provider/useConfigContext';
import { buttonStyles } from './button-style';
import React from 'react';

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger';

export type ButtonType = 'primary' | 'dashed' | 'text' | 'default';

export interface BaseButtonProps {
  /**
   * @description.zh-CN 按钮类型
   * @description.en-US button type
   * @default 'default'
   */
  type?: ButtonType;
}

export type NativeButtonProps = {
  htmlType?: 'submit' | 'button' | 'reset';
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export interface ButtonProps extends Partial<ComponentCommonProps & NativeButtonProps> {}

const ButtonComponent: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const { children, size: _size, type: _type, ...rest } = props;
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  return (
    <button ref={ref} css={buttonStyles(styleProps)} {...rest}>
      {children}
    </button>
  );
};

const Button = React.forwardRef(ButtonComponent);

export default Button;
