import { css } from '@emotion/react';
import { ConfigCommonOptions } from '../config-provider';

export interface KeyboardStyleProps extends ConfigCommonOptions {}

export const keyboardStyles = (props: KeyboardStyleProps) => {
  const { radius } = props.theme.style;
  const { thirdBackgroundColor, borderColor } = props.theme[props.theme.mode];

  return css`
    line-height: 2em;
    text-align: center;
    display: inline-block;
    background-color: ${thirdBackgroundColor};
    border-radius: ${radius}px;
    border: 1px solid ${borderColor};
    font-size: 14px;
    min-height: 2em;
    min-width: 2em;
    padding: 0 5px;
    span {
      font-size: 14px;
      text-align: center;
    }
    span + span {
      margin-left: 4px;
    }
  `;
};
