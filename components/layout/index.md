---
nav:
  title: Components
  path: /components
group:
  title: Basic
  order: 0
---

# Layout

## basic usage

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

## with sider

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

## sider layout

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

> Except for the properties here, all API of `Layout.Header` `Layout.Footer` `Layout.Content` `Layout.Sider` are the same as `Layout`
