import React, { useRef, useState } from 'react';
import { inputStyle } from './input-style';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import { Close } from '@icon-park/react';

export interface InputProps {
  defaultValue?: string;
  value?: string;
  inputMode?: 'search' | 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
  placeholder?: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  onInput?: (value: string, e: React.FormEvent<HTMLInputElement>) => void;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (value: string, e: React.FocusEvent<HTMLInputElement>) => void;
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
    inputMode,
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
        inputMode={inputMode}
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
