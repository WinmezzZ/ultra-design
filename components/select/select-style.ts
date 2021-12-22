import { css } from '@emotion/react';
import { SelectProps } from './select';
import { ComponentCommonProps, ConfigCommonOptions } from '../config-provider';

export interface SelectCSSProps extends SelectProps, ComponentCommonProps, ConfigCommonOptions {}

export const selectStyle = (_props: SelectCSSProps) => {
  return css`
    display: inline-flex;
  `;
};
