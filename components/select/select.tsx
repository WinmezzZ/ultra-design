import React, { useEffect, useState } from 'react';
import { selectStyle } from './select-style';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import Input from '../input';
import Dropdown from '../dropdown';
import Option, { OptionProps } from './option';
import { Up, Down } from '@icon-park/react';

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  clearable?: boolean;
  filterable?: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
  options?: OptionProps[];
  className?: string;
  style?: React.CSSProperties;
}

const Select: React.FC<SelectProps> = props => {
  const {
    disabled,
    onChange,
    value,
    defaultValue,
    placeholder,
    clearable,
    options,
    filterable,
    children,
    className,
    style,
  } = props;
  const [inputValue, setInputValue] = useState('');
  const [selectionLabel, setSelectionLabel] = useState<any>(defaultValue);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectValue, setSelectValue] = useState();
  const [dropdownVisivle, setDropdownVisivle] = useState(false);
  const [focus, setFocus] = useState(false);
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };
  const optionsData = children ? React.Children.toArray(children).map((item: any) => item.props) : options;

  useEffect(() => {
    if (defaultValue && !value && optionsData) {
      const defaultOptionIndex = optionsData.findIndex(opt =>
        [opt.value, opt.children, opt.label].includes(defaultValue),
      );

      setSelectedIndex(defaultOptionIndex);
    }
  }, []);

  const handleChange = (data: React.PropsWithChildren<OptionProps>, i: number) => {
    const { children, label, value: optionValue } = data;

    setSelectedIndex(i);
    setSelectionLabel(children || label);

    if (filterable && optionsData?.length) {
      const v = optionsData.find(o => o.value === optionValue);

      if (v) {
        setInputValue(v.value);
        onChange?.(value);
      }
    }

    setFocus(true);
  };

  useEffect(() => {
    setDropdownVisivle(false);
  }, [focus]);

  const handleClear = () => {
    setInputValue('');
    setSelectValue(undefined);

    onChange?.(selectValue);
  };

  return (
    <Dropdown
      visible={dropdownVisivle}
      onVisibleChange={v => setDropdownVisivle(v)}
      content={
        children
          ? React.Children.toArray(children).map((child: any, i) =>
              React.cloneElement(child, {
                className: clsx(selectedIndex === i && 'ultra-select-option--active'),
                onClick: () => !child.props.disabled && handleChange(child.props, i),
              }),
            )
          : options?.map((option, i) => (
              <Option
                {...option}
                className={clsx(selectedIndex === i && 'ultra-select-option--active')}
                onClick={() => handleChange(option, i)}
              />
            ))
      }
      getLayerContainer={node => node.parentNode as HTMLElement}
    >
      <div
        className={clsx([
          'ultra-select',
          className,
          focus && 'ultra-select--focused',
          disabled && 'ultra-select--disabled',
        ])}
        tabIndex={0}
        style={style}
        css={selectStyle(styleProps)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        {filterable ? (
          <Input
            defaultValue={inputValue}
            disabled={disabled}
            readOnly
            clearable={clearable}
            placeholder={placeholder}
            onClear={handleClear}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        ) : (
          <div className="ultra-select__selection">{selectionLabel}</div>
        )}
        <div className="ultra-select__icon">
          {dropdownVisivle ? <Up className="ultra-icon" /> : <Down className="ultra-icon" />}
        </div>
      </div>
    </Dropdown>
  );
};

Select.displayName = 'UltraSelect';

export default Select;
