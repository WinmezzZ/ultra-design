type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  style: {
    primaryColor: string;
    radius: number;
  };
  light: {
    textColor: string;
    reverseTextColor: string;
    borderColor: string;
    backgroundColor: string;
  };
  dark: {
    textColor: string;
    reverseTextColor: string;
    borderColor: string;
    backgroundColor: string;
  };
}

export const defaultTheme: Theme = {
  mode: 'light',
  style: {
    primaryColor: '#13c2c2',
    radius: 4,
  },
  light: {
    textColor: '#000000',
    borderColor: '#d9d9d9',
    reverseTextColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  dark: {
    textColor: '#FFFFFF',
    reverseTextColor: '#000000',
    borderColor: '##434343',
    backgroundColor: '#000000',
  },
};
