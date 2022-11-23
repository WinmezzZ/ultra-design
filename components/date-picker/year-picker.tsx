import { css } from '@emotion/react';
import clsx from 'clsx';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ConfigProviderProps } from '../config-provider';
import Dropdown from '../dropdown';
import { useMergeProps } from '../utils/mergeProps';

const years = new Array(99).fill(null).map((_, index) => index + 1 + new Date().getFullYear() - 50);

interface YearPickerProps {
  date: Date;
  value?: Date;
  onSelect: (date: Date) => void;
}

const defaultProps = {};

export type MergedYearPickerProps = typeof defaultProps & YearPickerProps;

const YearPicker: React.FC<YearPickerProps> = p => {
  const props = useMergeProps({}, p);
  const [yearVisible, setYearVisible] = useState(false);
  const { children, date, value, onSelect } = props;

  useEffect(() => {
    if (!yearVisible) return;
    const target: HTMLElement | null =
      document.querySelector('.ultra-year-picker__item.active') ||
      document.querySelector('.ultra-year-picker__item.toyear');

    setTimeout(() => {
      const parent = target?.parentNode as HTMLElement;

      if (target && parent) {
        parent.style.scrollBehavior = 'smooth';
        parent.scrollTop = target.offsetTop - 80;
      }
    }, 10);
  }, [yearVisible]);

  return (
    <Dropdown
      visible={yearVisible}
      onVisibleChange={setYearVisible}
      placement="bottom"
      trigger="click"
      content={
        <div css={yearPickerStyles(props)}>
          {years.map(year => (
            <div
              key={year}
              className={clsx(
                'ultra-year-picker__item',
                value && value.getFullYear() === year && 'active',
                new Date().getFullYear() === year && 'toyear',
              )}
              onClick={() => onSelect(set(date, { year }))}
            >
              {year}
            </div>
          ))}
        </div>
      }
    >
      {children}
    </Dropdown>
  );
};

export default YearPicker;

const yearPickerStyles = (props: MergedYearPickerProps & ConfigProviderProps) => {
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
    .ultra-year-picker__item {
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
      &.toyear:before {
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
