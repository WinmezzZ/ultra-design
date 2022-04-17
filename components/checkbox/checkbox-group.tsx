import React, { useEffect, useMemo, useState } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import { CheckboxContext } from './checkbox-context';
import { checkboxGroupStyles } from './checkbox-styles';

interface Props {
  /**
   * @description.zh-CN 选中的值
   * @description.en-US value
   */
  value: string[];
  /**
   * @description.zh-CN 禁用整个复选框 group
   * @description.en-US disable checkbox group
   */
  disabled?: boolean;
  /**
   * @description.zh-CN 复选框的值改变时触发的回调
   * @description.en-US the callback triggered when the value of the checkbox changes
   */
  onChange?: (values: string[]) => void;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;

export type CheckboxGroupProps = Props & NativeAttrs;

const defaultProps = {
  disabled: false,
  className: '',
};

export type MergedCheckboxGroupProps = typeof defaultProps & Props;

const CheckboxGroup: React.FC<React.PropsWithChildren<CheckboxGroupProps>> = (p: CheckboxGroupProps) => {
  const props = useMergeProps(defaultProps, p);

  const { disabled, onChange, children, ...rest } = props;
  let value = rest.value;
  const [selfVal, setSelfVal] = useState<string[]>([]);

  if (!value) {
    value = [];
    console.warn('Props "value" is required.', 'Checkbox Group');
  }

  const updateState = (val: string, checked: boolean) => {
    const removed = selfVal.filter(v => v !== val);
    const next = checked ? [...removed, val] : removed;

    setSelfVal(next);
    onChange && onChange(next);
  };

  const providerValue = useMemo(() => {
    return {
      updateState,
      disabledAll: disabled,
      inGroup: true,
      values: selfVal,
    };
  }, [disabled, selfVal]);

  useEffect(() => {
    setSelfVal(value);
  }, [value.join(',')]);

  return (
    <CheckboxContext.Provider value={providerValue}>
      <div css={checkboxGroupStyles(props)} {...rest} className="ultra-checkbox-group">
        {children}
      </div>
    </CheckboxContext.Provider>
  );
};

CheckboxGroup.displayName = 'UltraCheckboxGroup';

export default CheckboxGroup;
