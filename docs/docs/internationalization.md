---
title: Internationalization
order: 5
---

# internationalization

Ultra Design use Enligsh as default language，but also support other language.

At present, only 2 languages are supported. Welcome to contribute pull request

| Language | Path                         |
| -------- | ---------------------------- |
| English  | ultra-design/es/locale/en_US |
| Chinese  | ultra-design/es/locale/zh_CN |

If you need to use other languages, you can pass in the `locale` attribute through the `ConfigProvider` component

```jsx | pure
import zhCN from 'ultra-design/es/locale/zh_CN';

return (
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
```

Use internationalization with CDN mode, see [CDN](https://ultra-design.hyyar.com/docs/getting-started#internationalization)
