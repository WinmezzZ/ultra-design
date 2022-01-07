import React, { HTMLInputTypeAttribute, useRef, useState } from 'react';
import { inputStyle } from './input-style';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import { Close } from '@icon-park/react';

export interface InputProps {
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
  icon?: React.ReactNode;
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

const InputComponent: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const {
    defaultValue,
    disabled,
    readOnly,
    icon,
    onFocus,
    onBlur,
    onChange,
    onInput,
    value,
    type,
    placeholder,
    autoFocus,
    clearable,
    onClear,
  } = props;
  const [inputValue, setInputValue] = useState(defaultValue);
  const [focus, setFocus] = useState(false);
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  const inputRef = (ref as React.RefObject<HTMLInputElement>) || useRef<HTMLInputElement>(null);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocus(true);
    onFocus?.(e.target.value, e);
  };
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocus(false);
    onBlur?.(e.target.value, e);
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value);
    onChange?.(e.target.value, e);
  };
  const handleInput: React.FormEventHandler<HTMLInputElement> = e => {
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

  return (
    <div
      className={clsx(['ultra-input', focus && 'ultra-input--focused', disabled && 'ultra-input--disabled'])}
      css={inputStyle(styleProps)}
    >
      {icon && <span className="ultra-input__icon">{icon}</span>}
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
      />
      {inputValue && clearable && (
        <span className="ultra-input__clear" onClick={handleClear}>
          {<Close className="ultra-icon" />}
        </span>
      )}
    </div>
  );
};

const Input = React.forwardRef(InputComponent);

export default Input;
