---
nav:
  title: Components
  path: /components
group:
  title: 基本组件
---

# Popover 气泡卡片

## 基本使用

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <Popover content="哈哈">
      <Button>点击我</Button>
    </Popover>
  );
};
```

## 触发方式

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <div>
      <Popover content="哈哈">
        <Button>点击我</Button>
      </Popover>

      <Popover content="哈哈" trigger="hover">
        <Button>移入我</Button>
      </Popover>
    </div>
  );
};
```

## 弹出层方位

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <div className="tooltip-pisition" style={{ width: 400, height: 200 }}>
      <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
        <Popover placement="topLeft" content="哈哈">
          <Button>TL</Button>
        </Popover>
        <Popover placement="top" content="哈哈">
          <Button>Top</Button>
        </Popover>
        <Popover placement="topRight" content="哈哈">
          <Button>TR</Button>
        </Popover>
      </div>
      <div style={{ width: 70, float: 'left' }}>
        <Popover placement="leftTop" content="哈哈">
          <Button>LT</Button>
        </Popover>
        <Popover placement="left" content="哈哈">
          <Button>Left</Button>
        </Popover>
        <Popover placement="leftBottom" content="哈哈">
          <Button>LB</Button>
        </Popover>
      </div>
      <div style={{ width: 70, marginLeft: 304 }}>
        <Popover placement="rightTop" content="哈哈">
          <Button>RT</Button>
        </Popover>
        <Popover placement="right" content="哈哈">
          <Button>Right</Button>
        </Popover>
        <Popover placement="rightBottom" content="哈哈">
          <Button>RB</Button>
        </Popover>
      </div>
      <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popover placement="bottomLeft" content="哈哈">
          <Button>BL</Button>
        </Popover>
        <Popover placement="bottom" content="哈哈">
          <Button>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight" content="哈哈">
          <Button>BR</Button>
        </Popover>
      </div>
    </div>
  );
};
```

## 默认显示

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <div>
      <Popover defaultVisible content="哈哈">
        <Button>点击我</Button>
      </Popover>
    </div>
  );
};
```

## 自定义显示行为

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Popover
        visible={visible}
        onVisibleChange={v => setVisible(v)}
        content={
          <div>
            <h4>This is a content</h4>
            <Button size="mini" onClick={() => setVisible(false)}>
              Close
            </Button>
          </div>
        }
      >
        <Button>点击我</Button>
      </Popover>
    </div>
  );
};
```

## 隐藏箭头

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <Popover showArrow={false} content="哈哈">
      <Button>点击我</Button>
    </Popover>
  );
};
```

## 弹出层位置偏移

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <Popover offset={40} content="哈哈">
      <Button>点击我</Button>
    </Popover>
  );
};
```

## 设置弹框的父元素

默认 `Popover` 弹窗位置只会随着 `body` 一起滚动， 但如果 `Popover` 的触发器存在于内部滚动元素中 ，此时再滚动内部元素的话，弹窗不会跟着一起滚动。这时可以设置 `getLayerContainer` 为弹窗的渲染父节点来解决这个问题

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <div style={{ height: 200, width: 200, overflow: 'auto', position: 'relative' }}>
      <div style={{ height: 170 }}></div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: 240 }}>
        <Popover defaultVisible getLayerContainer={trigger => trigger.parentNode as HTMLElement} content="哈哈">
          <Button>Click Me</Button>
        </Popover>
        <div style={{ width: 40 }}></div>
      </div>
      <div style={{ height: 500 }}></div>
    </div>
  );
};
```

<API src="index.ts" />
