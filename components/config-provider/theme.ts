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
    secondBackgroundColor: string;
    thirdBackgroundColor: string;
    reverseBgColor: string;
    secondReverseBgColor: string;
    thirdReverseBgColor: string;
  };
  dark: {
    textColor: string;
    reverseTextColor: string;
    borderColor: string;
    backgroundColor: string;
    secondBackgroundColor: string;
    thirdBackgroundColor: string;
    reverseBgColor: string;
    secondReverseBgColor: string;
    thirdReverseBgColor: string;
  };
}

const lightBg_1 = '#FFFFFF';
const lightBg_2 = lightBg_1;
const lightBg_3 = lightBg_1;

const darkBg_1 = '#000000';
const darkBg_2 = '#141414';
const darkBg_3 = '#1f1f1f';

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
    backgroundColor: lightBg_1,
    secondBackgroundColor: lightBg_2,
    thirdBackgroundColor: lightBg_3,
    reverseBgColor: darkBg_1,
    secondReverseBgColor: darkBg_2,
    thirdReverseBgColor: darkBg_3,
  },
  dark: {
    textColor: '#FFFFFF',
    reverseTextColor: '#000000',
    borderColor: '#434343',
    backgroundColor: darkBg_1,
    secondBackgroundColor: darkBg_2,
    thirdBackgroundColor: darkBg_3,
    reverseBgColor: lightBg_1,
    secondReverseBgColor: lightBg_2,
    thirdReverseBgColor: lightBg_3,
  },
};
