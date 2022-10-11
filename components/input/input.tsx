import React, { HTMLInputTypeAttribute, useRef, useState } from 'react';
import { inputStyles, inputWithLabelStyles } from './input-style';
import clsx from 'clsx';
import { Close } from '@icon-park/react';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';

export interface Props {
  /**
   * @description.zh-CN 默认值
   * @description.en-US default value
   */
  defaultValue?: string;
  /**
   * @description.zh-CN 值
   * @description.en-US value
   */
  value?: string;
  /**
   * @description.zh-CN 原生 type 属性
   * @description.en-US native type
   */
  type?: HTMLInputTypeAttribute;
  /**
   * @description.zh-CN 占位符
   * @description.en-US placeholder
   */
  placeholder?: string;
  /**
   * @description.zh-CN 左侧图标
   * @description.en-US left icon
   */
  leftIcon?: React.ReactNode;
  /**
   * @description.zh-CN 右侧图标
   * @description.en-US  icon
   */
  rightIcon?: React.ReactNode;
  /**
   * @description.zh-CN 值可以被清空
   * @description.en-US value can be cleared
   */
  clearable?: boolean;
  /**
   * @description.zh-CN 禁用状态
   * @description.en-US disabled status
   */
  disabled?: boolean;
  /**
   * @description.zh-CN 是否只读
   * @description.en-US readolny
   */
  readOnly?: boolean;
  /**
   * @description.zh-CN 出现时自动获得焦点
   * @description.en-US auto focused when show
   */
  autoFocus?: boolean;
  /**
   * @description.zh-CN 输入框标题
   * @description.en-US input label
   */
  label?: React.ReactNode;
  onInput?: (value: string, e: React.FormEvent<HTMLInputElement>) => void;
  /**
   * @description.zh-CN 输入或时的回调
   * @description.en-US callback of input
   */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * @description.zh-CN 手动清空时的回调
   * @description.en-US callback of clearable
   */
  onClear?: (value: string, e: React.MouseEvent<HTMLDivElement>) => void;
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props | 'size'>;

export type InputProps = Props & NativeAttrs;

const defaultProps = {};

export type MergedInputProps = typeof defaultProps & Props;

const InputComponent: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const {
    defaultValue,
    disabled,
    readOnly,
    leftIcon,
    rightIcon,
    onFocus,
    onBlur,
    onChange,
    onInput,
    value,
    type,
    label,
    placeholder,
    autoFocus,
    clearable,
    onClear,
    className,
    size: _size,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState(defaultValue);
  const [focus, setFocus] = useState(false);

  const inputRef = (ref as React.RefObject<HTMLInputElement>) || useRef<HTMLInputElement>(null);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    onFocus?.(e.target.value, e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onBlur?.(e.target.value, e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value, e);
  };
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setFocus(true);
    onInput?.(e.currentTarget.value, e);
  };
  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    setInputValue('');
    const el = inputRef.current;

    if (!el) return;
    el.value = '';

    const fakeEvent: React.ChangeEvent<HTMLInputElement> = {
      ...e,
      target: el,
      currentTarget: el,
    };

    onChange?.('', fakeEvent);
    onClear?.('', fakeEvent as any as React.MouseEvent<HTMLDivElement>);
  };

  const inputRender = () => {
    return (
      <div
        className={clsx([
          'ultra-input',
          focus && 'ultra-input--focused',
          disabled && 'ultra-input--disabled',
          className,
        ])}
        css={inputStyles(props)}
        ref={ref}
      >
        {leftIcon && <div className="ultra-input__icon ultra-input__left_icon">{leftIcon}</div>}
        <input
          ref={inputRef}
          type={type}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          {...rest}
        />
        {rightIcon && <div className="ultra-input__icon  ultra-input__right_icon">{rightIcon}</div>}
        {inputValue && clearable && (
          <span className="ultra-input__clear" onClick={handleClear}>
            {<Close className="ultra-icon" />}
          </span>
        )}
      </div>
    );
  };

  return label ? (
    <div className="ultra-input-with_label" css={inputWithLabelStyles(props)}>
      {label && <span className="ultra-input__label">{label}</span>}
      {inputRender()}
    </div>
  ) : (
    inputRender()
  );
};

const Input = React.forwardRef(InputComponent);

export default withStyle(Input);
