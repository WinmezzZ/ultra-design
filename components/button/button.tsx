import { buttonStyles } from './button-style';
import React from 'react';
import Ripple from '../ripple/ripple';
import LoadingIcon from './loading-icon';
import { useMergeProps } from '../utils/mergeProps';
import { ComponentCommonProps } from '../config-provider/config-provider';

export type ButtonType = 'primary' | 'dashed' | 'text' | 'default' | 'pure';

export interface Props extends Partial<ComponentCommonProps> {
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
   * @description.zh-CN 是否禁用按钮
   * @description.en-US disabled state of button
   * @default false
   */
  disabled?: boolean;

  /**
   * @description.zh-CN 开启涟漪效果
   * @description.en-US enable ripple effect
   * @default true
   */
  effect?: boolean;

  /**
   * @description.zh-CN 按钮状态
   * @description.en-US button status
   * @default true
   */
  status?: 'success' | 'error' | 'warning';
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>;

export type ButtonProps = Props & NativeAttrs;

const defaultProps = {
  effect: true,
};

export type MergedButtonProps = typeof defaultProps & Props;

const ButtonComponent: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const { children, effect, type, onClick, loading, disabled, ...rest } = props;

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      e.preventDefault();

      return;
    }

    onClick?.(e);
  };

  const rippleElement =
    effect && !['text', 'pure'].includes(type as string) && !loading && !disabled ? <Ripple /> : null;

  return (
    <button ref={ref} css={buttonStyles(props)} onClick={clickHandler} className="ultra-button" {...rest}>
      {loading && <LoadingIcon />}
      <span className="ultra-button__text">{children}</span>
      {rippleElement}
    </button>
  );
};

const Button = React.forwardRef(ButtonComponent);

Button.displayName = 'UltraButton';

export default Button;
