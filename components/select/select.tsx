import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { selectLayerStyles, selectStyles } from './select-style';
import clsx from 'clsx';
import Input from '../input';
import Option, { OptionProps } from './option';
import { Down, Up } from '@icon-park/react';
import Trigger from '../trigger';
import { useMergeProps } from '../utils/mergeProps';
import { useClickOutSide } from '@winme/react-hooks';
import { TriggerRef } from '../trigger/trigger';

export interface SelectProps {
  /**
   * @description.zh-CN 值
   * @description.en-US value
   */
  value?: string;
  /**
   * @description.zh-CN 默认值值
   * @description.en-US default value
   */
  defaultValue?: string;
  /**
   * @description.zh-CN 占位符
   * @description.en-US placeholder
   */
  placeholder?: string;
  clearable?: boolean;
  filterable?: boolean;
  /**
   * @description.zh-CN 是否禁用
   * @description.en-US whether disable
   */
  disabled?: boolean;
  /**
   * @description.zh-CN 选择时触发的回调
   * @description.en-US triggered when selecting an option
   */
  onChange?: (value: any) => void;
  /**
   * @description.zh-CN option
   * @description.en-US list of configuration items for options
   */
  options?: OptionProps[];
  className?: string;
  style?: React.CSSProperties;
}

const defaultProps = {
  name: 'ultra-select',
};

export type MergedSelectProps = typeof defaultProps & SelectProps;

const SelectComponent: React.ForwardRefRenderFunction<unknown, React.PropsWithChildren<SelectProps>> = (p, ref) => {
  const props = useMergeProps(defaultProps, p);
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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectValue, setSelectValue] = useState<string | number | boolean | undefined>(
    'value' in props ? value : defaultValue,
  );
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [dropdownVisivle, setDropdownVisivle] = useState(false);
  const [focus, setFocus] = useState(false);
  const optionsData: React.PropsWithChildren<OptionProps>[] = children
    ? React.Children.toArray(children).map((item: any) => item.props)
    : options || [];
  const triggerRef = useRef<TriggerRef>(null);

  const selectionLabel = useMemo(() => {
    if (!selectValue) return undefined;

    const defaultOptionIndex = optionsData.findIndex(opt => (opt.value ?? (opt.children || opt.label)) === selectValue);

    if (defaultOptionIndex >= 0) {
      setSelectedIndex(defaultOptionIndex);

      return optionsData[defaultOptionIndex].children || optionsData[defaultOptionIndex].label;
    }
  }, [selectValue]);

  useEffect(() => {
    setSelectValue(value);
  }, [value]);

  useImperativeHandle(
    ref,
    () => {
      return {
        value: selectValue,
      };
    },
    [selectValue],
  );

  const handleChange = (data: React.PropsWithChildren<OptionProps>, i: number) => {
    const { value: optionValue } = data;

    const finalValue = optionValue ?? (data.children || data.label);

    setSelectedIndex(i);
    setSelectValue(finalValue as any);

    if (!optionsData.length) return;
    const v = optionsData.find(o => o.value === optionValue);

    if (v) {
      setTimeout(() => {
        onChange?.(finalValue);
      });
    }

    setFocus(true);
    setDropdownVisivle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    const optsLen = optionsData.length;

    if (disabled || !optsLen) return;
    if (optionsData.every(o => o.disabled)) return;

    if (e.code === 'ArrowDown' && dropdownVisivle) {
      setHoverIndex(i => {
        while (optionsData[(i + 1) % optsLen].disabled) {
          i += 1;
        }

        return (i + 1) % optsLen;
      });
    } else if (e.code === 'ArrowUp' && dropdownVisivle) {
      setHoverIndex(i => {
        while (optionsData[(i - 1 + optsLen) % optsLen].disabled) {
          i -= 1;
        }

        return (i - 1 + optsLen) % optsLen;
      });
    } else if (e.code === 'Enter') {
      setDropdownVisivle(!dropdownVisivle);
      const noHover = hoverIndex <= -1;

      if (dropdownVisivle && !noHover) {
        handleChange(optionsData[hoverIndex], hoverIndex);
      }
    }

    // TODO: for fix ref always null
    // if (selfRef.current) {
    //   selfRef.current.focus();
    // }
  };

  const handleClear = () => {
    setInputValue('');
    setSelectValue(undefined);

    setTimeout(() => {
      onChange?.(selectValue);
    });
  };

  const renderOptionItem = (option: any, props: OptionProps, index: number) => {
    return React.cloneElement(option, {
      ...props,
      key: index,
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

  useClickOutSide({ current: triggerRef.current?.layerElement }, () => {
    setFocus(true);
  });

  return (
    <Trigger
      visible={dropdownVisivle}
      onVisibleChange={v => setDropdownVisivle(v)}
      showArrow={false}
      placement="bottomLeft"
      trigger="click"
      ref={triggerRef}
      content={
        children
          ? React.Children.toArray(children).map((child: any, i) => renderOptionItem(child, child.props, i))
          : options?.map((option, i) => renderOptionItem(Option, option, i))
      }
      {...props}
      name="ultra-select"
      transitionClassName="ultra-select-layer-slide"
      getLayerContainer={node => node?.parentNode as HTMLElement}
      css={selectLayerStyles(props)}
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
        css={selectStyles(props)}
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
          <div className="ultra-select__selection">
            {selectionLabel || <span className="ultra-select__placeholder">{placeholder}</span>}
          </div>
        )}
        <div className="ultra-select__icon">
          {dropdownVisivle ? <Up className="ultra-icon" /> : <Down className="ultra-icon" />}
        </div>
      </div>
    </Trigger>
  );
};

const Select = React.forwardRef(SelectComponent);

Select.displayName = 'UltraSelect';

export default Select;
