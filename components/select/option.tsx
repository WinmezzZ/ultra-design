import React, { FC } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import { useConfigContext } from '../config-provider/useConfigContext';
import { ComponentCommonProps, ConfigCommonOptions } from '../config-provider';
import { fade } from '../utils/fade';

export interface OptionProps {
  label?: React.ReactNode;
  value?: string | number | boolean;
  disabled?: boolean;
  onClick?: (value?: string | number | boolean) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  className?: string;
}

const Option: FC<OptionProps> = props => {
  const { label, value, disabled, children, onClick, onMouseEnter, className } = props;
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  const handleClick = () => {
    if (disabled) return;
    onClick?.(value);
  };

  return (
    <div
      className={clsx('ultra-select-option', disabled && 'ultra-select-option--disabled', className)}
      css={optionStyle(styleProps)}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
    >
      {children || (label && <div>{label}</div>)}
    </div>
  );
};

Option.displayName = 'UltraSelectOption';

export default Option;

export interface OptionCSSProps extends OptionProps, ComponentCommonProps, ConfigCommonOptions {}

const optionStyle = (props: OptionCSSProps) => {
  const { theme } = props;
  const { primaryColor } = theme.style;
  const { disabledBgColor, disabledTextColor } = theme[theme.mode];

  return css`
    display: flex;
    align-items: center;
    padding: 0 12px;
    min-height: 32px;
    cursor: pointer;

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
      background-color: #f0f1f3;
      color: #000000;
    }
  `;
};
