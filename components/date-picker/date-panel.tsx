import { datePanelStyles } from './date-picker-style';
import { FC } from 'react';
import { useMergeProps } from '../utils/mergeProps';
import { addMonths, endOfMonth, getMonth, isSameDay, isToday, set, startOfMonth } from 'date-fns';
import clsx from 'clsx';
import { isNull } from 'lodash-es';
import { ArrowLeftSLineIcon, ArrowRightSLineIcon } from 'ultra-icon';
import YearPicker from './year-picker';
import MonthPicker from './month-picker';
import uuid from '../utils/uuid';

export type DatePickerType = 'primary' | 'dashed' | 'text' | 'default' | 'pure';

export type DateType = 'date' | 'month' | 'year';

export interface DatePanelProps {
  date?: Date;
  onSelect: (date: Date, type: 'date' | 'month' | 'year', value: number) => void;
}

const defaultProps = {};

export type MergedDatePanelProps = typeof defaultProps & DatePanelProps;

const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const DatePanel: FC<DatePanelProps> = p => {
  const props = useMergeProps(defaultProps, p);
  const { date = new Date(), onSelect } = props;

  const firstDay = startOfMonth(date).getDay();

  const dayCounts = endOfMonth(date).getDate();

  const emptyDays = new Array((7 - firstDay) % 7).fill(null);

  const usableDays = new Array(dayCounts).fill(null).map((_, index) => index + 1);

  const days = [...emptyDays, ...usableDays];

  const handleClickDay = (day: number | null) => {
    if (isNull(day)) return;

    const newDate = set(date, { date: day });

    onSelect(newDate, 'date', day);
  };

  const handleLastMonth = () => {
    const newDate = addMonths(date, -1);

    onSelect(newDate, 'month', new Date().getMonth() - 1);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(date, 1);

    onSelect(newDate, 'month', new Date().getMonth() + 1);
  };

  console.log(date, props.date);

  return (
    <div css={datePanelStyles(props)}>
      <div className="ultra-date-panel__header">
        <div className="ultra-date-panel__header_arrow" onClick={handleLastMonth}>
          <ArrowLeftSLineIcon />
        </div>
        <div className="ultra-date-panel__header_date">
          <YearPicker
            date={props.date}
            onSelect={d => onSelect(set(date, { year: d.getFullYear() }), 'year', d.getFullYear())}
          >
            <div className="ultra-date-panel__header_date_month">{date.getFullYear()}年</div>
          </YearPicker>
          <MonthPicker
            date={props.date}
            onSelect={d => onSelect(set(date, { month: getMonth(d) }), 'month', d.getMonth())}
          >
            <div className="ultra-date-panel__header_date_year">{getMonth(date) + 1}月</div>
          </MonthPicker>
        </div>
        <div className="ultra-date-panel__header_arrow" onClick={handleNextMonth}>
          <ArrowRightSLineIcon />
        </div>
      </div>
      <ul className="ultra-date-panel__weekday_tab">
        {weekdays.map(day => (
          <li className="ultra-date-panel__weekday_item" key={day}>
            {day}
          </li>
        ))}
      </ul>
      <div className="ultra-date-panel__month_day_container">
        {days.map(day => (
          <div
            onClick={() => handleClickDay(day)}
            className={clsx([
              'ultra-date-panel__month_day_item',
              isNull(day) && 'hidden',
              !isNull(day) && props.date && isSameDay(set(date, { date: day }), props.date) && 'active',
              !isNull(day) && isToday(set(date, { date: day })) && 'today',
            ])}
            key={uuid()}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePanel;
