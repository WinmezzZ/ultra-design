---
nav:
  title: 文档
  order: 1
title: Internationalization 国际化
order: 5
---

# Internationalization 国际化

Ultra Design 默认使用英语，但同样也支持多语言

目前只支持 2 种语言，欢迎贡献 PR

| 语言 | 路径                         |
| ---- | ---------------------------- |
| 英文 | ultra-design/es/locale/en_US |
| 中文 | ultra-design/es/locale/zh_CN |

如果需要使用其他语言，可以通过 `ConfigProvider` 组件传入 `locale` 属性

```jsx | pure
import zhCN from 'ultra-design/es/locale/zh_CN';

return (
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);
```

在 CDN 的方式下使用国际化，请见 [CDN 方式使用 国际化](https://ultra-design.hyyar.com/zh-CN/docs/getting-started#%E5%9B%BD%E9%99%85%E5%8C%96)
