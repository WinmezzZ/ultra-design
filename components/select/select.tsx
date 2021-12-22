import React, { useState } from 'react';
import { selectStyle } from './select-style';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import Input from '../input';
import Popover from '../popover';

export interface SelectProps {
  value?: string;
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
}

const Select: React.FC<SelectProps> = props => {
  const { disabled, onChange, value, placeholder, clearable } = props;
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState();
  const [focus, setFocus] = useState(false);
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInputValue('');
    setSelectValue(undefined);

    onChange?.(selectValue);
  };

  return (
    <Popover content={1} getLayerContainer={node => node.parentNode as HTMLElement}>
      <div
        className={clsx(['ultra-input', focus && 'ultra-select--focused', disabled && 'ultra-input--disabled'])}
        css={selectStyle(styleProps)}
      >
        <Input
          value={inputValue}
          disabled={disabled}
          readOnly
          clearable={clearable}
          placeholder={placeholder}
          onClear={handleClear}
        />
      </div>
    </Popover>
  );
};

export default Select;
