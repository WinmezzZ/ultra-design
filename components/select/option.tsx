import React, { FC } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import { ConfigProviderProps } from '../config-provider';
import { fade } from '../utils/fade';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';

export interface OptionProps {
  /**
   * @description.zh-CN 选项的内容
   * @description.en-US option's content
   */
  label?: string;
  /**
   * @description.zh-CN 选项的值，必须是唯一的
   * @description.en-US option's value, must be unique
   */
  value?: string | number;
  /**
   * @description.zh-CN 选项的禁用状态
   * @description.en-US disabled status of option
   */
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

const defaultProps = {};

export type MergedOptionProps = typeof defaultProps & OptionProps;

const Option: FC<OptionProps> = p => {
  const props = useMergeProps(defaultProps, p);
  const { label, disabled, children, onClick, onMouseEnter, className } = props;

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <div
      className={clsx('ultra-select-option', disabled && 'ultra-select-option--disabled', className)}
      css={optionStyles(props)}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
    >
      {children || (label && <div>{label}</div>)}
    </div>
  );
};

Option.displayName = 'UltraSelectOption';

export default withStyle(Option);

type OptionStylesProps = MergedOptionProps & ConfigProviderProps;

const optionStyles = (props: OptionStylesProps) => {
  const { theme } = props;
  const { primaryColor } = theme.style;
  const { textColor, disabledBgColor, disabledTextColor, reverseBgColor } = theme[theme.mode];

  return css`
    display: flex;
    align-items: center;
    padding: 0 12px;
    min-height: 32px;
    cursor: pointer;
    user-select: none;

    &.ultra-select-option--disabled {
      background-color: ${disabledBgColor};
      color: ${disabledTextColor};
      cursor: not-allowed;
    }
    &.ultra-select-option--active {
      background-color: ${fade(primaryColor, 0.1)};
      color: ${primaryColor};

      &.ultra-select-option--hover {
        background-color: ${fade(primaryColor, 0.3)};
      }
    }
    &:not(.ultra-select-option--disabled, .ultra-select-option--active).ultra-select-option--hover {
      background-color: ${fade(reverseBgColor, 0.1)};
      color: ${textColor};
    }
  `;
};
