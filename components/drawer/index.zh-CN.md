---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  order: 1
---

# Drawer 对话框

## 基本使用

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Click Me</Button>
      <Drawer visible={visible} title="标题" onClose={() => setVisible(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
    </div>
  );
};
```

## 弹框位置

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

export default () => {
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible1(true)}>贴紧顶部</Button>
      <Button onClick={() => setVisible2(true)}>垂直居中</Button>
      <Drawer top={0} visible={visible1} title="标题" onClose={() => setVisible1(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
      <Drawer center visible={visible2} title="标题" onClose={() => setVisible2(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
    </div>
  );
};
```

## 隐藏部分内容

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

export default () => {
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  const [visible4, setVisible4] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible1(true)}>隐藏关闭图标</Button>
      <Button onClick={() => setVisible2(true)}>隐藏取消按钮</Button>
      <Button onClick={() => setVisible3(true)}>隐藏尾部</Button>
      <Button onClick={() => setVisible4(true)}>只显示 body</Button>
      <Drawer hideClose visible={visible1} title="标题" onClose={() => setVisible1(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
      <Drawer cancelButton={null} visible={visible2} title="标题" onClose={() => setVisible2(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
      <Drawer
        confirmButton={null}
        cancelButton={null}
        visible={visible3}
        title="标题"
        onClose={() => setVisible3(false)}
      >
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
      <Drawer confirmButton={null} cancelButton={null} hideClose visible={visible4} onClose={() => setVisible4(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
    </div>
  );
};
```

## 确认弹出框

在 `onOk` 或 `onCancel` 中返回 `false` 将阻止关闭，支持 `Promise` 异步

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

export default () => {
  const showConfirm = () => {
    Drawer.confirm({
      content: '2333',
      onOk: () => {
        return false;
      },
    });
  };
  return (
    <div>
      <Button onClick={showConfirm}>打开确认弹出框</Button>
    </div>
  );
};
```

<API src="drawer.tsx" />

## 注意事项

- 当 `confirmButton` 和 `cancelButton` 同时设为 `null` 时，整个底部组件将会被隐藏

- top 属性默认为 10vh，但如果设置了 center 属性后，top 的默认值将取消，但是你依然可以手动再设置 top 的值
