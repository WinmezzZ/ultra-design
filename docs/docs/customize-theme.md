---
title: Customize Theme
order: 3
---

# Customize Theme

```js | pure
const lightBg_1 = '#FFFFFF';
const lightBg_2 = lightBg_1;
const lightBg_3 = lightBg_1;

const darkBg_1 = '#000000';
const darkBg_2 = '#141414';
const darkBg_3 = '#1f1f1f';

const theme = {
  mode: 'light',
  style: {
    primaryColor: '#13c2c2',
    radius: 6,
    boxShadow: '0 1px 10px 0 rgb(0 0 0 / 25%)',
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
    disabledBgColor: '#f5f5f5',
    disabledTextColor: '#00000040',
    disabledBorderColor: '#d9d9d9',
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
    disabledBgColor: 'rgba(255,255,255,.08)',
    disabledTextColor: 'rgba(255,255,255,.3)',
    disabledBorderColor: '#434343',
  },
};
```

attribute introduction

- **mode**: theme mode (light/dark)
- **style**: common style
- **light**: sepcial style for light
- **mode**: sepcial style for dark

You can modify only some attributes or styles. Finally, all modifications will be merged into theme. You can customize the style by passing the theme variable into `ConfigProvider`.
