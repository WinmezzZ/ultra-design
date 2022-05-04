---
nav:
  title: 组件
  path: /components
group:
  title: Basic
  order: 0
---

# Layout 布局

## 基本用法

```tsx
import React from 'react';
import { Layout } from 'ultra-design';

export default () => {
  return (
    <Layout style={{ height: 200 }}>
      <Layout.Header color="primary">header</Layout.Header>
      <Layout.Content>content</Layout.Content>
      <Layout.Footer style={{ borderTop: '1px solid #ccc' }}>footer</Layout.Footer>
    </Layout>
  );
};
```

## sider

```tsx
import React from 'react';
import { Layout } from 'ultra-design';

export default () => {
  return (
    <Layout>
      <Layout.Header color="primary">header</Layout.Header>
      <Layout style={{ height: 100 }}>
        <Layout.Sider style={{ borderRight: '1px solid #ccc' }}>sider</Layout.Sider>
        <Layout.Content>content</Layout.Content>
      </Layout>
      <Layout.Footer style={{ borderTop: '1px solid #ccc' }}>footer</Layout.Footer>
    </Layout>
  );
};
```

## sider 布局

```tsx
import React from 'react';
import { Layout } from 'ultra-design';

export default () => {
  return (
    <Layout style={{ height: 200 }}>
      <Layout.Sider style={{ borderRight: '1px solid #ccc' }}>sider</Layout.Sider>
      <Layout>
        <Layout.Header color="primary">header</Layout.Header>
        <Layout.Content>content</Layout.Content>
        <Layout.Footer style={{ borderTop: '1px solid #ccc' }}>footer</Layout.Footer>
      </Layout>
    </Layout>
  );
};
```

## API

### Layout

<API hideTitle src="./layout.tsx" />

### Layout.Header

<API hideTitle src="./header.tsx" />

### Layout.Sider

<API hideTitle src="./sider.tsx" />

> 除了这里展示的属性外，`Layout.Header` `Layout.Footer` `Layout.Content` `Layout.Sider` 的 API 和 `Layout` 都相同
