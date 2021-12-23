import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { selectStyle } from './select-style';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import Input from '../input';
import Dropdown from '../dropdown';
import Option, { OptionProps } from './option';
import { Down, Up } from '@icon-park/react';
import { isNil } from 'lodash-es';

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

const SelectComponent: React.ForwardRefRenderFunction<unknown, SelectProps> = (props, ref) => {
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
  const selfRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectionLabel, setSelectionLabel] = useState<any>(defaultValue);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectValue, setSelectValue] = useState<string | number | boolean | undefined>(value || defaultValue);
  const [hoverIndex, setHoverIndex] = useState(-1);
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

      return;
    }
    if (!isNil(value) && optionsData) {
      const defaultOptionIndex = optionsData.findIndex(opt => opt.value === value);

      setSelectionLabel(optionsData[defaultOptionIndex].children || optionsData[defaultOptionIndex].label);
      setSelectedIndex(defaultOptionIndex);

      return;
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      value: selectValue,
    };
  });

  const handleChange = (data: React.PropsWithChildren<OptionProps>, i: number) => {
    const { children, label, value: optionValue } = data;

    setSelectedIndex(i);
    setSelectionLabel(children || label);

    setSelectValue(optionValue);

    if (!optionsData?.length) return;
    const v = optionsData.find(o => o.value === optionValue);

    if (v) {
      onChange?.(optionValue);
    }

    setFocus(true);
    setDropdownVisivle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!optionsData?.length) return;
    if (optionsData.every(o => o.disabled)) return;
    if (e.code === 'ArrowDown') {
      setHoverIndex(i => {
        let step = 1;

        for (let j = 0; j < optionsData.length - 1; j++) {
          const next = i + j + 1;

          if (optionsData[next >= optionsData.length ? 0 : next].disabled) {
            step += 1;
          } else {
            break;
          }
        }

        return i >= optionsData.length - 1 ? step - 1 : i + step;
      });
    } else if (e.code === 'ArrowUp') {
      setHoverIndex(i => {
        let step = 1;

        for (let j = 0; j < optionsData.length - 1; j++) {
          const next = i - j - 1;

          if (optionsData[next <= -1 ? optionsData.length - 1 : next].disabled) {
            step += 1;
          } else {
            break;
          }
        }

        return i <= -1 ? optionsData.length - step : i - step;
      });
    }

    if (e.code === 'Enter') {
      const noHover = hoverIndex <= -1;

      if (noHover) {
        setDropdownVisivle(!dropdownVisivle);
      } else {
        handleChange(optionsData[hoverIndex], hoverIndex);
      }
    }

    // TODO: for fix ref always null
    if (selfRef.current) {
      selfRef.current.focus();
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSelectValue(undefined);

    onChange?.(selectValue);
  };

  const renderOptionItem = (option: any, props: OptionProps, index: number) => {
    return React.cloneElement(option, {
      ...props,
      className: clsx(
        selectedIndex === index && 'ultra-select-option--active',
        hoverIndex === index && 'ultra-select-option--hover',
      ),
      onClick: () => !props.disabled && handleChange(props, index),
      onMouseEnter: () => {
        setHoverIndex(index);
      },
    });
  };

  return (
    <Dropdown
      visible={dropdownVisivle}
      onVisibleChange={v => setDropdownVisivle(v)}
      content={
        children
          ? React.Children.toArray(children).map((child: any, i) => renderOptionItem(child, child.props, i))
          : options?.map((option, i) => renderOptionItem(Option, option, i))
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
        onKeyDown={handleKeyDown}
        ref={selfRef}
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

const Select = React.forwardRef(SelectComponent);

Select.displayName = 'UltraSelect';

export default Select;
