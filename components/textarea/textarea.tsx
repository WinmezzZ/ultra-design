import React, { useMemo, useState } from 'react';
import { textareaStyles, textareaWithLabelStyles } from './textarea-style';
import clsx from 'clsx';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';

const resizeTypes = ['none', 'both', 'horizontal', 'vertical', 'initial', 'inherit'] as const;

export interface Props {
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
   * @description.zh-CN 占位符
   * @description.en-US placeholder
   */
  placeholder?: string;
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
   * @description.zh-CN 输入或时的回调
   * @description.en-US callback of textarea
   */
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * @description.zh-CN CSS resize 属性
   * @description.en-US CSS resize attribute
   */
  resize?: typeof resizeTypes[number];
}

type NativeAttrs = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type TextareaProps = Props & NativeAttrs;

const defaultProps = {
  resize: 'none',
};

export type MergedTextareaProps = typeof defaultProps & Props;

const TextareaComponent: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = (p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const {
    defaultValue,
    disabled,
    readOnly,
    onFocus,
    onBlur,
    onChange,
    value,
    placeholder,
    resize,
    className,
    style,
    ...rest
  } = props;
  const isControlledComponent = useMemo(() => value !== undefined, [value]);
  const [textareaValue, setTextareaValue] = useState(defaultValue);
  const [focus, setFocus] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocus(true);
    onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocus(false);
    onBlur?.(e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled || readOnly) return;
    setTextareaValue(e.target.value);
    onChange?.(e.target.value, e);
  };

  return (
    <div className="ultra-textarea-with_label" css={textareaWithLabelStyles(props)}>
      <div
        className={clsx([
          'ultra-textarea',
          focus && 'ultra-textarea--focused',
          disabled && 'ultra-textarea--disabled',
          className,
        ])}
        css={textareaStyles(props)}
        style={style}
      >
        <textarea
          ref={ref}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...(isControlledComponent ? { value: textareaValue } : { defaultValue })}
          style={{ resize }}
          {...rest}
        />
      </div>
    </div>
  );
};

const Textarea = React.forwardRef(TextareaComponent);

export default withStyle(Textarea);
