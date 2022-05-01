---
nav:
  title: Components
  path: /components
group:
  title: Data Display
  order: 3
---

# Tabs

## Basic Usage

```tsx
import React from 'react';
import { Tabs } from 'ultra-design';

export default () => {
  return (
    <div>
      <Tabs defaultValue="a">
        <Tabs.Item label="Declarative" value="a">
          <p>
            React makes it painless to create interactive UIs. Design simple views for each state in your application.
          </p>
          <p> Declarative views make your code more predictable and easier to debug.</p>
        </Tabs.Item>
        <Tabs.Item label="Component-Based" value="b">
          <p>Build encapsulated components that manage their own state, then compose them to make complex UIs.</p>
          <p>
            Since component logic is written in JavaScript instead of templates, you can easily pass rich data through
            your app and keep state out of the DOM.
          </p>
        </Tabs.Item>
      </Tabs>
    </div>
  );
};
```

## With Icon

```tsx
import React from 'react';
import { Tabs, Button } from 'ultra-design';
import { AppleOne, Avocado } from '@icon-park/react';

export default () => {
  return (
    <div>
      <Tabs defaultValue="a">
        <Tabs.Item label="Declarative" value="a" icon={<AppleOne theme="outline" size="18" />}>
          <p>
            React makes it painless to create interactive UIs. Design simple views for each state in your application.
          </p>
          <p> Declarative views make your code more predictable and easier to debug.</p>
        </Tabs.Item>
        <Tabs.Item label="Component-Based" value="b" icon={<Avocado theme="outline" size="18" />}>
          <p>Build encapsulated components that manage their own state, then compose them to make complex UIs.</p>
          <p>
            Since component logic is written in JavaScript instead of templates, you can easily pass rich data through
            your app and keep state out of the DOM.
          </p>
        </Tabs.Item>
      </Tabs>
    </div>
  );
};
```

## API

#### Select

<API hideTitle src="./tabs.tsx" />

#### Select.Option

<API hideTitle src="./tabs-item.tsx" />
