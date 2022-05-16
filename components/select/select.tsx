import React, {
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { selectLayerStyles, selectStyles } from './select-style';
import clsx from 'clsx';
import Option, { OptionProps } from './option';
import { Close, Down, Up } from '@icon-park/react';
import Trigger from '../trigger';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';
import { css } from '@emotion/react';

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
  const selfRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [filterFinished, setFilterFinished] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectValue, setSelectValue] = useState<string | number | boolean | undefined>(
    'value' in props ? value : defaultValue,
  );
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [dropdownVisivle, setDropdownVisivle] = useState(false);
  const [focus, setFocus] = useState(false);
  const [layerMinWidth, setLayerMinWidth] = useState('0');

  const optionsData: React.PropsWithChildren<OptionProps>[] = children
    ? React.Children.toArray(children).map((item: any) => item.props)
    : options || [];

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
    setInputValue(data.label || (data.children as string));
    setFilterFinished(true);

    if (!optionsData.length) return;
    const v = optionsData.find(o => o.value === optionValue);

    if (v) {
      setTimeout(() => {
        onChange?.(finalValue);
      });
    }

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

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.code)) {
      e.stopPropagation();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dropdownVisivle) {
      e.preventDefault();
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSelectValue(undefined);

    setTimeout(() => {
      onChange?.(selectValue);
    });
  };

  const renderOptionItem = (option: any, props: OptionProps, index: number) => {
    const { onClick: _onClick, onMouseEnter: _onMouseEnter, className, ...rest } = props;

    return React.cloneElement(option, {
      ...rest,
      key: index,
      className: clsx(
        className,
        selectedIndex === index && 'ultra-select-option--active',
        hoverIndex === index && 'ultra-select-option--hover',
      ),
      onClick: e => {
        _onClick?.(e);
        !props.disabled && handleChange(props, index);
      },
      onMouseEnter: e => {
        _onMouseEnter?.(e);
        setHoverIndex(index);
      },
    });
  };

  const filteredList = useMemo(() => {
    const list = (React.Children.toArray(children) || options) as (
      | ReactElement<PropsWithChildren<OptionProps>>
      | OptionProps
    )[];

    const res =
      !filterable || filterFinished
        ? list
        : list.filter((item: any) => {
            const label_ = 'label' in item ? item.label : item.props.children;

            if (!label_) return false;

            if (typeof label_ !== 'string') {
              console.error(
                'Warning: When set `Select` filterable property as true, You must provide label or children props of `Option` string type',
              );

              return false;
            }

            return label_.toLowerCase().includes(inputValue.toLowerCase());
          });

    return res.map((item, index) => {
      return isValidElement(item) ? renderOptionItem(item, item.props, index) : renderOptionItem(Option, item, index);
    });
  }, [inputValue, filterable, hoverIndex]);

  return (
    <div
      className={clsx([
        'ultra-select',
        className,
        focus && 'ultra-select--focused',
        disabled && 'ultra-select--disabled',
      ])}
      tabIndex={1}
      style={style}
      css={selectStyles(props)}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      ref={node => {
        if (!node) return;
        selfRef.current = node;
        setLayerMinWidth(getComputedStyle(node).width);
      }}
    >
      <Trigger
        triggerRef={selfRef}
        visible={dropdownVisivle}
        onVisibleChange={v => setDropdownVisivle(v)}
        showArrow={false}
        placement="bottomLeft"
        trigger="click"
        content={filteredList.length ? filteredList : <p style={{ textAlign: 'center' }}>No Data</p>}
        {...props}
        name="ultra-select"
        transitionClassName="ultra-select-layer-slide"
        getLayerContainer={node => node?.parentNode as HTMLElement}
        css={[
          selectLayerStyles(props),
          css`
            min-width: ${layerMinWidth};
          `,
        ]}
      ></Trigger>
      {filterable ? (
        <input
          onKeyDown={handleInputKeyDown}
          onInput={e => setInputValue(e.currentTarget.value)}
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
        />
      ) : (
        <div className="ultra-select__selection">
          {selectionLabel || <span className="ultra-select__placeholder">{placeholder}</span>}
        </div>
      )}
      <div className="ultra-select__icon">
        {clearable ? (
          <Close onClick={handleClear} />
        ) : dropdownVisivle ? (
          <Up className="ultra-icon" />
        ) : (
          <Down className="ultra-icon" />
        )}
      </div>
    </div>
  );
};

const Select = React.forwardRef(SelectComponent);

Select.displayName = 'UltraSelect';

export default withStyle(Select);
