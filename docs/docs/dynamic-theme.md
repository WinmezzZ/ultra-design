---
title: Dynamic Theme
order: 4
---

# Dynamic Theme

In addition to supporting customized themes, ultra design also supports the ability to dynamically switch themes, which is also configured through `ConfigProvider`.

The core idea is also very simple. Save the theme configuration as the react state. If the state changes, the corresponding UI will also change.

## Example Code

```jsx | pure
import { useState } from 'react';
import { Button, Select, ConfigProvider } from 'ultra-design';

const { Option } = Select;

export default function App() {
  const [themeMode, setThemeMode] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#13c2c2');

  const onChangeThemeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const onChangePrimaryColor = color => {
    setPrimaryColor(color);
  };

  return (
    <ConfigProvider theme={{ mode: themeMode, style: { primaryColor } }}>
      <div className="App">
        <p>Current themeMode is: {themeMode}</p>
        <p>Current primaryColor is: {primaryColor}</p>
        <Button type="primary" onClick={onChangeThemeMode}>
          Change ThemeMode
        </Button>
        <br />
        <Select placeholder="Change PrimaryColor" value={primaryColor} onChange={onChangePrimaryColor}>
          <Option value="#13c2c2">Defaut</Option>
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
          <Option value="orange">Orange</Option>
        </Select>
      </div>
    </ConfigProvider>
  );
}
```

## Online Demo

<iframe src="https://codesandbox.io/embed/icy-dawn-zbkdm?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="icy-dawn-zbkdm"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
   ></iframe>
