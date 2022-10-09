import React, {
  forwardRef,
  isValidElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { selectLayerStyles, selectStyles } from './select-style';
import clsx from 'clsx';
import Option, { OptionProps as OptionPropsWithNoChild } from './option';
import { Close, Down, Up } from '@icon-park/react';
import Trigger from '../trigger';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';
import { css } from '@emotion/react';

interface OptionProps extends React.PropsWithChildren<OptionPropsWithNoChild> {}

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
  /**
   * @description.zh-CN 支持输入过滤，如果传入函数则可以自定义过滤方法
   * @description.en-US supported Input filtering, and custom filtering methods can be used if pass in a function type
   */
  filterable?: boolean | ((keyword: string, option: OptionProps) => boolean);
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
  className?: string;
  style?: React.CSSProperties;
}

const defaultProps = {
  name: 'ultra-select',
};

export type MergedSelectProps = typeof defaultProps & SelectProps;

const SelectComponent = forwardRef<unknown, React.PropsWithChildren<SelectProps>>((p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const { disabled, onChange, value, defaultValue, placeholder, clearable, filterable, children, className, style } =
    props;
  const selfRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [filterFinished, setFilterFinished] = useState(true);
  const [selectValue, setSelectValue] = useState<string | number | boolean | ReactNode | undefined>(
    'value' in props ? value : defaultValue,
  );
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [dropdownVisivle, setDropdownVisivle] = useState(false);
  const [focus, setFocus] = useState(false);
  const [layerMinWidth, setLayerMinWidth] = useState('0');

  const selfFilterMethod = (option: OptionProps) => {
    const label_ = 'label' in option ? option.label : typeof option.children === 'string' ? option.children : '';

    if (!label_) return false;

    return label_.toLowerCase().includes(inputValue.toLowerCase());
  };

  const filterMethod = useCallback(
    (option: OptionProps) => {
      if (typeof filterable === 'function') {
        return filterable(inputValue, option);
      } else {
        return selfFilterMethod(option);
      }
    },
    [filterable, inputValue],
  );

  const optionList: OptionProps[] = useMemo(() => {
    const childs: OptionProps[] = [];

    React.Children.toArray(children).forEach(child => {
      if (isValidElement(child)) {
        childs.push(child.props);
      }
    });

    return childs;
  }, [children]);

  const filteredOptionList = useMemo(() => {
    const filteredData = !filterable || filterFinished ? optionList : optionList.filter(filterMethod);

    return filteredData;
  }, [filterable, filterFinished, optionList, filterMethod]);

  const selectIndex = filteredOptionList.findIndex(opt => (opt.value || opt.label || opt.children) === selectValue);

  const selectionLabel = useMemo(() => {
    if (!selectValue) return undefined;

    if (selectIndex >= 0) {
      setHoverIndex(selectIndex);

      const { children, label } = filteredOptionList[selectIndex];

      if (filterable) {
        setInputValue(typeof children === 'string' ? children : label!);
      }

      return children || label;
    }
  }, [selectValue, filteredOptionList, selectIndex]);

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

  const handleChange = (data: React.PropsWithChildren<OptionProps>) => {
    const { value: optionValue } = data;

    const finalValue = optionValue ?? (data.children || data.label);

    setSelectValue(finalValue);
    if (!data.label && typeof data.children === 'string') {
      setInputValue(data.children);
    }
    setFilterFinished(true);

    const v = filteredOptionList.find(o => o.value === optionValue);

    if (v) {
      setTimeout(() => {
        onChange?.(finalValue);
      });
    }

    setDropdownVisivle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    const optsLen = filteredOptionList.length;

    if (disabled || !optsLen) return;
    if (filteredOptionList.every(o => o.disabled)) return;

    if (e.code === 'ArrowDown' && dropdownVisivle) {
      setHoverIndex(i => {
        while (filteredOptionList[(i + 1) % optsLen].disabled) {
          i += 1;
        }

        return (i + 1) % optsLen;
      });
    } else if (e.code === 'ArrowUp' && dropdownVisivle) {
      setHoverIndex(i => {
        while (filteredOptionList[(i - 1 + optsLen) % optsLen].disabled) {
          i -= 1;
        }

        return (i - 1 + optsLen) % optsLen;
      });
    } else if (e.code === 'Enter') {
      const noHover = hoverIndex <= -1;

      if (noHover) {
        return;
      }
      setDropdownVisivle(!dropdownVisivle);

      if (dropdownVisivle && !noHover) {
        if (!filteredOptionList[hoverIndex]) {
          return;
        }
        handleChange(filteredOptionList[hoverIndex]);
      }
    }
  };

  const handleInputKeyDown = (_e: React.KeyboardEvent) => {
    _e.stopPropagation();
    // if (!['ArrowDown', 'ArrowUp', 'Enter', 'Backspace'].includes(e.code)) {
    //   e.stopPropagation();
    // }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dropdownVisivle) {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    setDropdownVisivle(true);
    setFilterFinished(false);
  };

  const handleClear = () => {
    setInputValue('');
    setSelectValue(undefined);

    setTimeout(() => {
      onChange?.(selectValue);
    });
  };

  useEffect(() => {
    if (!dropdownVisivle && !filteredOptionList.length) {
      if (typeof selectionLabel === 'string') {
        setInputValue(selectionLabel);
      }
    }
  }, [dropdownVisivle]);

  const renderOptionItem = (props: OptionProps, index: number) => {
    const { onClick: _onClick, onMouseEnter: _onMouseEnter, className, ...rest } = props;
    const idx = filteredOptionList.findIndex(opt => (opt.value || opt.children || opt.label) === selectValue);

    return React.cloneElement(<Option />, {
      ...rest,
      key: index,
      id: `ultra-select-option_${index}`,
      className: clsx(
        className,
        idx === index && 'ultra-select-option--active',
        hoverIndex === index && 'ultra-select-option--hover',
      ),
      onClick: (e: React.MouseEvent) => {
        _onClick?.(e);
        !props.disabled && handleChange(props);
      },
      onMouseEnter: (e: React.MouseEvent) => {
        _onMouseEnter?.(e);
        setHoverIndex(index);
      },
    });
  };

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
        showDelay={0}
        onVisibleChange={v => setDropdownVisivle(v)}
        showArrow={false}
        placement="bottomLeft"
        trigger="click"
        content={
          filteredOptionList.length ? (
            filteredOptionList.map(renderOptionItem)
          ) : (
            <p style={{ textAlign: 'center' }}>No Data</p>
          )
        }
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
          onInput={handleInput}
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
        />
      ) : (
        <div className="ultra-select__selection">
          {selectionLabel || selectValue || <span className="ultra-select__placeholder">{placeholder}</span>}
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
});

SelectComponent.displayName = 'UltraSelect';

const Select = withStyle(SelectComponent);

export default Select;
