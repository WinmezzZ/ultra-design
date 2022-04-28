import { css } from '@emotion/react';
import { ConfigProviderProps } from '..';
import { MergedKeyboardProps } from './keyboard';

type KeyboardStylesProps = MergedKeyboardProps & ConfigProviderProps;

export const keyboardStyles = (props: KeyboardStylesProps) => {
  const { theme } = props;
  const { radius } = theme.style;
  const { thirdBackgroundColor, borderColor } = props.theme[props.theme.mode];

  return css`
    color: ${theme[theme.mode].textColor};
    line-height: 28px;
    text-align: center;
    display: inline-block;
    background-color: ${thirdBackgroundColor};
    border-radius: ${radius}px;
    border: 1px solid ${borderColor};
    min-height: 28px;
    min-width: 28px;
    padding: 0 5px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    span {
      text-align: center;
    }
    span + span {
      margin-left: 4px;
    }
  `;
};
