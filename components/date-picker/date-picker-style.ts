import { css } from '@emotion/react';
import { ConfigProviderProps } from '../config-provider/config-provider';
import { fade } from '../utils/fade';
import { MergedDatePanelProps } from './date-panel';

export const datePickerStyles = () => {
  return css`
    width: 320px;
    padding: 16px;
    overflow-x: hidden;
  `;
};

type ButtonStyleProps = MergedDatePanelProps & ConfigProviderProps;

export const datePanelStyles = (props: ButtonStyleProps) => {
  const { mode } = props.theme;
  const { textColor, reverseTextColor } = props.theme[mode];
  const { primaryColor } = props.theme.style;

  return css`
    .ultra-date-panel__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
      .ultra-date-panel__header_date {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        .ultra-date-panel__header_date_month,
        .ultra-date-panel__header_date_year {
          font-weight: 600;
        }
      }
      .ultra-date-panel__header_arrow {
        cursor: pointer;
        &:hover {
          color: ${primaryColor};
        }
      }
    }
    .ultra-date-panel__weekday_tab {
      display: flex;
      align-items: center;
      .ultra-date-panel__weekday_item {
        width: 36px;
        height: 40px;
        margin: 0 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${fade(textColor, 0.8)};
      }
    }

    .ultra-date-panel__month_day_container {
      display: flex;
      flex-wrap: wrap;
      .ultra-date-panel__month_day_item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        letter-spacing: 0.03333em;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin: 0px 2px;
        position: relative;
        transition: all 0.3s;
        &:hover:not(.active) {
          color: ${primaryColor};
        }
        &:not(.hidden) {
          cursor: pointer;
        }
        &.active {
          background-color: ${primaryColor};
          color: ${reverseTextColor};
        }
        &.today:before {
          position: absolute;
          inset: 4px;
          z-index: 1;
          border: 1px solid ${primaryColor};
          border-radius: 2px;
          content: '';
        }
      }
    }
  `;
};
