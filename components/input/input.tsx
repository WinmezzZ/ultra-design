import React, { HTMLInputTypeAttribute, useRef, useState } from 'react';
import { inputStyle } from './input-style';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import { Close } from '@icon-park/react';
import { isNil } from 'lodash-es';

export interface InputProps {
  defaultValue?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  icon?: React.ReactNode;
  clearable?: boolean;
  disabled?: boolean;
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const InputComponent: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const { defaultValue, disabled, icon, onFocus, onBlur, onChange, onInput, value, type, clearable } = props;
  const [focus, setFocus] = useState(false);
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  const inputRef = (ref as React.RefObject<HTMLInputElement>) || useRef<HTMLInputElement>(null);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocus(true);
    onFocus?.(e);
  };
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocus(false);
    onBlur?.(e);
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onChange?.(e);
  };
  const handleInput: React.FormEventHandler<HTMLInputElement> = e => {
    setFocus(true);
    onInput?.(e);
  };
  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = inputRef.current;

    if (!el) return;
    el.value = '';

    const fakeEvent: React.ChangeEvent<HTMLInputElement> = {
      ...e,
      target: el,
      currentTarget: el,
    };

    onChange?.(fakeEvent);
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
        value={isNil(value) ? '' : value}
        {...(ref ? { defaultValue } : {})}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
      />
      {value && clearable && (
        <span className="ultra-input__clear" onClick={handleClear}>
          {<Close />}
        </span>
      )}
    </div>
  );
};

const Input = React.forwardRef(InputComponent);

Input.defaultProps = {
  type: 'text',
};

export default Input;
