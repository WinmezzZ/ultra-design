import { css } from '@emotion/react';
import clsx from 'clsx';
import { ConfigProviderProps } from 'ultra-design';
import { set } from 'date-fns';
import React, { useState } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import Dropdown from '../dropdown';

const months = new Array(12).fill(null).map((_, index) => index + 1);

interface MonthPickerProps {
  date: Date;
  value?: Date;
  onSelect: (date: Date) => void;
}

const defaultProps = {};

export type MergedMonthPickerProps = typeof defaultProps & MonthPickerProps;

const MonthPicker: React.FC<MonthPickerProps> = p => {
  const props = useMergeProps({}, p);
  const [monthVisible, setMonthVisible] = useState(false);
  const { children, date, value, onSelect } = props;

  return (
    <Dropdown
      visible={monthVisible}
      onVisibleChange={setMonthVisible}
      placement="bottom"
      trigger="click"
      content={
        <div css={monthPickerStyles(props)}>
          {months.map(month => (
            <div
              key={month}
              className={clsx(
                'ultra-month-picker__item',
                value && value.getMonth() === month && 'active',
                new Date().getMonth() === month && 'tomonth',
              )}
              onClick={() => onSelect(set(date, { month }))}
            >
              {month}
            </div>
          ))}
        </div>
      }
    >
      {children}
    </Dropdown>
  );
};

export default MonthPicker;

const monthPickerStyles = (props: MergedMonthPickerProps & ConfigProviderProps) => {
  const { mode } = props.theme;
  const { reverseTextColor } = props.theme[mode];
  const { primaryColor } = props.theme.style;

  return css`
    width: 220px;
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px 0;
    padding: 10px;
    .ultra-month-picker__item {
      cursor: pointer;
      position: relative;
      z-index: 2;
      display: inline-block;
      width: 60px;
      text-align: center;
      height: 24px;
      line-height: 24px;
      border-radius: 2px;
      transition: background 0.3s, border 0.3s;
      &:hover:not(.active) {
        color: ${primaryColor};
      }
      &.active {
        background-color: ${primaryColor};
        color: ${reverseTextColor};
      }
      &.tomonth:before {
        position: absolute;
        inset: 3px;
        z-index: 1;
        border: 1px solid ${primaryColor};
        border-radius: 2px;
        content: '';
      }
    }
  `;
};
