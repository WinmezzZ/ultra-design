type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode?: ThemeMode;
  style?: React.CSSProperties;
}

export const theme: Theme = {
  mode: 'dark',
  style: {},
};
