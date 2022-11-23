import { datePickerStyles } from './date-picker-style';
import React, { forwardRef, useEffect, useState } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';
import Input, { InputProps } from '../input';
import { Calendar2LineIcon } from 'ultra-icon';
import Dropdown from '../dropdown';
import DatePanel, { DateType } from './date-panel';
import { format } from 'date-fns';

export type DatePickerType = 'primary' | 'dashed' | 'text' | 'default' | 'pure';

export interface DatePickerProps extends Omit<InputProps, 'value' | 'onChange'> {
  /**
   * @description.zh-CN 日期
   * @description.en-US date value
   */
  value?: Date;
  /**
   * @description.zh-CN 时间发生变化的回调函数
   * @description.en-US time changed callback
   */
  onChange?: (value?: Date) => void;
}

const defaultProps = {};

export type MergedDatePickerProps = typeof defaultProps & DatePickerProps;

const DatePickerComponent = forwardRef<any, DatePickerProps>((p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const { value, onChange, ...inputProps } = props;
  const [layerVisible, setLayerVisible] = useState(false);
  const [selfValue, setSelfValue] = useState(value);
  const [selectedDate, setSeleteDate] = useState(selfValue);

  useEffect(() => {
    if (value === undefined) return;
    setSelfValue(value);
  }, [value]);

  const handleSelectDate = (date: Date, type: DateType) => {
    setSelfValue(date);
    if (type === 'date') {
      setLayerVisible(false);
      onChange?.(date);
    }
  };

  return (
    <Dropdown
      visible={layerVisible}
      onVisibleChange={setLayerVisible}
      trigger="click"
      placement="bottomLeft"
      content={
        <div css={datePickerStyles()}>
          <DatePanel date={selfValue} selectedDate={selectedDate} onSelect={handleSelectDate} />
        </div>
      }
    >
      <Input
        rightIcon={<Calendar2LineIcon />}
        {...inputProps}
        readOnly
        value={value || selfValue ? format(value! || selfValue, 'yyyy-MM-dd') : ''}
      ></Input>
    </Dropdown>
  );
});

const DatePicker = withStyle(DatePickerComponent);

DatePicker.displayName = 'UltraDatePicker';

export default DatePicker;
