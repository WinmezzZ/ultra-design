import { css } from '@emotion/react';
import { Size } from 'components/config-provider';
import React from 'react';
import { ConfigContextOptions } from 'ultra-design';
import { ButtonProps } from '.';

export interface ButtonStyleProps extends ButtonProps, ConfigContextOptions {}

const buttonSizeStyleMap: Record<Size, React.CSSProperties> = {
  mini: {
    height: 24,
    padding: '0px 6px',
  },
  small: {
    height: 28,
    padding: '2px 10px',
  },
  middle: {
    height: 28,
    padding: '4px 15px',
  },
  large: {
    height: 36,
    padding: '6px 20px',
  },
  larger: {
    height: 40,
    padding: '6px 25px',
  },
};

export const buttonStyles = (props: ButtonProps) => css`
  height: ${buttonSizeStyleMap[props.size!].height}px;
  padding: ${buttonSizeStyleMap[props.size!].padding};
`;
