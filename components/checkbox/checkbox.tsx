import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import { useCheckbox } from './checkbox-context';
import { checkboxStyles } from './checkbox-styles';

export interface CheckboxEventTarget {
  checked: boolean;
}
export interface CheckboxEvent {
  target: CheckboxEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent;
}

interface Props {
  checked?: boolean;
  /**
   * @description.zh-CN 选中的值
   * @description.en-US value
   */
  value?: string;
  /**
   * @description.zh-CN 禁用复选框
   * @description.en-US disable checkbox
   */
  disabled?: boolean;
  /**
   * @description.zh-CN 默认选中
   * @description.en-US checked as default
   */
  defaultChecked?: boolean;
  /**
   * @description.zh-CN 复选框的值改变时触发的回调
   * @description.en-US the callback triggered when the value of the checkbox changes
   */
  onChange?: (e: CheckboxEvent) => void;
}

const defaultProps = {
  disabled: false,
  defaultChecked: false,
  className: '',
  value: '',
};

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props | 'size'>;

export type CheckboxProps = Props & NativeAttrs;

export type MergedCheckboxProps = typeof defaultProps & CheckboxProps;

const Checkbox: React.FC<CheckboxProps> = (p: CheckboxProps) => {
  const props = useMergeProps(defaultProps, p);
  const { checked, defaultChecked, disabled, onChange, children, size: _size, value, ...rest } = props;
  const [selfChecked, setSelfChecked] = useState<boolean>(defaultChecked);
  const { updateState, inGroup, disabledAll, values } = useCheckbox();
  const isDisabled = inGroup ? disabledAll || disabled : disabled;

  if (inGroup && checked) {
    console.warn('Remove props "checked" when [Checkbox] component is in the group.', 'Checkbox');
  }
  if (inGroup) {
    useEffect(() => {
      const next = values.includes(value);

      if (next === selfChecked) return;
      setSelfChecked(next);
    }, [values.join(',')]);
  }

  const changeHandle = useCallback(
    (ev: React.ChangeEvent) => {
      if (isDisabled) return;
      const selfEvent: CheckboxEvent = {
        target: {
          checked: !selfChecked,
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev,
      };

      if (inGroup && updateState) {
        updateState && updateState(value, !selfChecked);
      }

      setSelfChecked(!selfChecked);
      onChange && onChange(selfEvent);
    },
    [updateState, onChange, isDisabled, selfChecked],
  );

  useEffect(() => {
    if (checked === undefined) return;
    setSelfChecked(checked);
  }, [checked]);

  return (
    <label
      className={clsx(
        'ultra-checkbox',
        selfChecked && 'ultra-checkbox--checked',
        disabled && 'ultra-checkbox--disabled',
      )}
      css={checkboxStyles(props)}
    >
      <div className="ultra-checkbox__icon">
        <input type="checkbox" disabled={isDisabled} checked={selfChecked} onChange={changeHandle} {...rest} />
      </div>
      <span className="ultra-checkbox__text">{children}</span>
    </label>
  );
};

Checkbox.displayName = 'UltraCheckbox';

export default Checkbox;
