---
title: Dark Mode
order: 2
---

# Dark Mode

## Full Dark Mode

All bright colors are used by default, and Ultra Design also supports dark mode.

The exported `ConfigProvider` component is nested on the root component and its `theme` attribute is provided. The `mode: 'dark'` can be specified as the dark mode.

```jsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Button } from 'ultra-design';

// root component
const App = () => {
  return <div>...</div>;
};

ReactDOM.render(
  <ConfigProvider theme={{ mode: 'dark' }}>
    <App />
  </ConfigProvider>,
  document.getElementById('root'),
);
```

## Local Dark Mode

Sometimes you just want to modify some parts and combine them into dark mode. You can nest `ConfigProvider` outside any component instead of the root component.

```jsx | pure
import { ConfigProvider, Button } from 'ultra-design';

const Container = () => {
  return (
    <ConfigProvider theme={{ mode: 'dark' }}>
      <div>
        <Button>I'm Dark</Button>
      </div>
    </ConfigProvider>
  );
};
```

## Modify Defaut Theme

You may think that the default black is not very suitable for your appetite. You can try to [modify theme](./customize-theme.md) to customize the style you need.
