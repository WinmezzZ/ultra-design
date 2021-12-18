import { ComponentCommonProps } from '../config-provider';
import { useConfigContext } from '../config-provider/useConfigContext';
import { buttonStyles } from './button-style';
import React from 'react';
import Ripple from '../ripple/ripple';
import LoadingIcon from './loading-icon';

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
   * @description.zh-CN 是否显示加载中
   * @description.en-US enable loading
   * @default false
   */
  loading?: boolean;

  /**
   * @description.zh-CN 开启涟漪效果
   * @description.en-US enable ripple effect
   * @default true
   */
  effect?: boolean;

  /**
   * @description.zh-CN 点击事件
   * @description.click event
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonProps extends Partial<ComponentCommonProps>, React.PropsWithChildren<BaseButtonProps> {}

const ButtonComponent: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (props, ref) => {
  const { children, effect, type, onClick, loading, ...rest } = props;
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      e.preventDefault();

      return;
    }

    onClick?.(e);
  };

  const rippleElement = effect && type !== 'text' && !loading ? <Ripple /> : null;

  return (
    <button ref={ref as any} css={buttonStyles(styleProps)} onClick={clickHandler} {...rest}>
      {loading && <LoadingIcon />}
      <span>{children}</span>
      {rippleElement}
    </button>
  );
};

const Button = React.forwardRef(ButtonComponent);

Button.defaultProps = {
  effect: true,
  loading: false,
};

Button.displayName = 'UltraButton';

export default Button;
