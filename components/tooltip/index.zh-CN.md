---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  order: 1
---

# Tooltip 文字提示

## 基本使用

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <Tooltip title="哈哈">
      <Button>移入我</Button>
    </Tooltip>
  );
};
```

## 触发方式

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <div>
      <Tooltip title="哈哈">
        <Button>移入我</Button>
      </Tooltip>

      <Tooltip title="哈哈" trigger="click">
        <Button>点击我</Button>
      </Tooltip>
    </div>
  );
};
```

## 弹出层方位

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <div className="tooltip-pisition" style={{ width: 400, height: 200 }}>
      <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
        <Tooltip placement="topLeft" title="哈哈">
          <Button>TL</Button>
        </Tooltip>
        <Tooltip placement="top" title="哈哈">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip placement="topRight" title="哈哈">
          <Button>TR</Button>
        </Tooltip>
      </div>
      <div style={{ width: 70, float: 'left' }}>
        <Tooltip placement="leftTop" title="哈哈">
          <Button>LT</Button>
        </Tooltip>
        <Tooltip placement="left" title="哈哈">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip placement="leftBottom" title="哈哈">
          <Button>LB</Button>
        </Tooltip>
      </div>
      <div style={{ width: 70, marginLeft: 304 }}>
        <Tooltip placement="rightTop" title="哈哈">
          <Button>RT</Button>
        </Tooltip>
        <Tooltip placement="right" title="哈哈">
          <Button>Right</Button>
        </Tooltip>
        <Tooltip placement="rightBottom" title="哈哈">
          <Button>RB</Button>
        </Tooltip>
      </div>
      <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
        <Tooltip placement="bottomLeft" title="哈哈">
          <Button>BL</Button>
        </Tooltip>
        <Tooltip placement="bottom" title="哈哈">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip placement="bottomRight" title="哈哈">
          <Button>BR</Button>
        </Tooltip>
      </div>
    </div>
  );
};
```

## 默认显示

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <div>
      <Tooltip defaultVisible title="哈哈" trigger="click">
        <Button>点击我</Button>
      </Tooltip>
    </div>
  );
};
```

## 自定义显示行为

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Tooltip
        visible={visible}
        onVisibleChange={v => setVisible(v)}
        title={
          <div>
            <h4>This is a title</h4>
            <Button size="mini" onClick={() => setVisible(false)}>
              Close
            </Button>
          </div>
        }
        trigger="click"
      >
        <Button>点击我</Button>
      </Tooltip>
    </div>
  );
};
```

## 隐藏箭头

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <Tooltip showArrow={false} title="哈哈">
      <Button>移入我</Button>
    </Tooltip>
  );
};
```

## 弹出层位置偏移

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <Tooltip offset={40} title="哈哈">
      <Button>移入我</Button>
    </Tooltip>
  );
};
```

## 设置弹框的父元素

默认 `Tooltip` 弹窗位置只会随着 `body` 一起滚动， 但如果 `Tooltip` 的触发器存在于内部滚动元素中 ，此时再滚动内部元素的话，弹窗不会跟着一起滚动。这时可以设置 `getLayerContainer` 为弹窗的渲染父节点来解决这个问题

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <div style={{ height: 200, width: 200, overflow: 'auto', position: 'relative' }}>
      <div style={{ height: 170 }}></div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: 240 }}>
        <Tooltip
          defaultVisible
          trigger="click"
          getLayerContainer={trigger => trigger?.parentNode as HTMLElement}
          title="哈哈"
        >
          <Button>Click Me</Button>
        </Tooltip>
        <div style={{ width: 40 }}></div>
      </div>
      <div style={{ height: 500 }}></div>
    </div>
  );
};
```

<API src="index.ts" />
