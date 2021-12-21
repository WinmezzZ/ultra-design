import React, { HTMLInputTypeAttribute, useImperativeHandle, useRef, useState } from 'react';
import { inputStyle } from './input-style';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import { Close } from '@icon-park/react';

export interface InputProps {
  defaultValue?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  icon?: React.ReactNode;
  clearable?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const InputComponent: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const { defaultValue, icon, onFocus, onBlur, onChange, value, type, clearable } = props;
  const [focus, setFocus] = useState(false);
  const [selfValue, setSelfValue] = useState(defaultValue);
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current!);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocus(true);
    onFocus?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocus(false);
    onBlur?.(e);
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setSelfValue(e.target.value);
    setFocus(false);
    onChange?.(e);
  };
  const handleClear = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelfValue('');
    const el = inputRef.current;

    if (!el) return;

    const fakeEvent: React.ChangeEvent<HTMLInputElement> = {
      ...e,
      target: { ...el, value: '' },
      currentTarget: el,
    };

    onChange?.(fakeEvent);
  };

  return (
    <div className={clsx(['ultra-input', focus && 'ultra-input-focused'])} css={inputStyle(styleProps)}>
      {icon && <span className="ultra-input__icon">{icon}</span>}
      <input
        ref={inputRef}
        type={type}
        value={selfValue}
        defaultValue={selfValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
