import { css } from '@emotion/react';
import { ConfigProviderProps } from '../config-provider';
import { MergedDividerProps } from './divider';

type DividerStylesProps = MergedDividerProps & ConfigProviderProps;

export const dividerStyles = (props: DividerStylesProps) => {
  const { vertical } = props;
  const { textColor, borderColor, backgroundColor } = props.theme[props.theme.mode];

  return css`
    max-width: 100%;
    background-color: ${borderColor};
    position: relative;
    font-size: 14px;
    ${vertical
      ? css`
          display: inline-flex;
          width: 1px;
          height: 12px;
          margin: 0 8px;
        `
      : css`
          height: 1px;
          margin: 8px 0;
        `};

    .ultra-divider__text {
      background-color: ${backgroundColor};
      position: absolute;
      left: 50%;
      top: 50%;
      min-height: 100%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      transform: translate(-50%, -50%);
      padding: 0 0.75em;
      font-size: inherit;
      font-weight: bold;
      color: ${textColor};
    }
  `;
};
