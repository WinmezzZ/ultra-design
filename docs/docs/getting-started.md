---
title: Getting Start
order: 1
---

# Getting Start

## 1、Install

```bash
# use npm
npm i ultra-design --save
```

```bash
# use yarn
yarn add ultra-design
```

## 2、Usage

```tsx | pure
import ReactDOM from 'react-dom';
import { Button } from 'ultra-design';

const App = () => {
  return (
    <div>
      <Button>Button</Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

Because ultra design uses [emotion.js](https://emotion.sh/docs/@emotion/react) is the scheme of CSS in JS, so there is no need to import CSS files separately. When importing components, the corresponding style files will be loaded automatically.

## 3、Tree Shaking

Ultra Design supports tree shaping based on ES modules by default. For the JS part, directly introducing `import { Button } from 'ultra design'`will have the effect of loading on demand.

## 4、Use With CDN

> It is not recommended to directly use the built file, which will fully introduce all components and cannot load on demand.

```html
<head>
  <script src="https://unpkg.com/browse/ultra-design@latest/dist/index.js"></script>
</head>
<body>
  <script type="text/babel">
    const { Button } = UltraDesign;
    ReactDOM.render(
      <div>
        <Button>Button</Button>
      </div>,
      document.getElementById('root'),
    );
  </script>
</body>
```
