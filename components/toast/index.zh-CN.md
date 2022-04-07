---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  order: 4
---

# Toast 提示消息

## 基本使用

```tsx
import React from 'react';
import { Toast, Button } from 'ultra-design';

export default () => {
  const showToast = () => {
    Toast('Hello!');
  };
  return <Button onClick={showToast}>打开 Toast</Button>;
};
```

## 自动关闭时间

将 duration 设置为 0 以始终显示

```tsx
import React from 'react';
import { Toast, Button } from 'ultra-design';

export default () => {
  const showToast = () => {
    Toast({
      content: 'Hello!',
      duration: 0,
    });
  };
  return <Button onClick={showToast}>不会自动关闭</Button>;
};
```

## 提示消息类型

```jsx
import React from 'react';
import { Toast, Button } from 'ultra-design';

const info = () => {
  Toast.info('这是一个信息提示');
};
const success = () => {
  Toast.success('这是一个成功提示');
};
const error = () => {
  Toast.error('这是一个错误提示');
};
const warning = () => {
  Toast.warning('这是一个警告提示');
};

export default () => {
  const showToast = type => {};
  return (
    <>
      <Button type="primary" onClick={info}>
        信息
      </Button>
      <Button status="success" onClick={success}>
        成功
      </Button>
      <Button status="error" onClick={error}>
        错误
      </Button>
      <Button status="warning" onClick={warning}>
        警告
      </Button>
    </>
  );
};
```

## 使用 JS API 清除 Toast

```tsx
import React from 'react';
import { Toast, Button } from 'ultra-design';

export default () => {
  const showToast = () => {
    Toast({
      content: '我不会被自动关闭',
      duration: 0,
      hideClose: true,
    });
  };
  const clearToast = () => {
    Toast.clear();
  };
  return (
    <>
      <Button onClick={showToast}>打开一个用户无法关闭的 Toast </Button>
      <Button onClick={clearToast}>点击我清除 Toast</Button>
    </>
  );
};
```

## API

`Toast(content: string, duration?: number, onClose?: () => void)`

| 属性     | 描述                       | 类型         | 默认   |
| -------- | -------------------------- | ------------ | ------ |
| content  | Toast 内容                 | `string`     | `--`   |
| duration | 自动关闭的时间             | `number`     | `2000` |
| onClose  | Toast 关闭时触发的回调函数 | `() => void` | `--`   |

`Toast(options: ToastOptions)`

<API src="toast-internal.tsx" export="['ToastInternal']" hideTitle />

#### Toast 方法

- Toast.info: `(content: React.ReactNode, duration?: number, onClose?: OnClose) => void;`

- Toast.success: `(content: React.ReactNode, duration?: number, onClose?: OnClose) => void;`

- Toast.warning: `(content: React.ReactNode, duration?: number, onClose?: OnClose) => void;`

- Toast.error: `(content: React.ReactNode, duration?: number, onClose?: OnClose) => void;`

- Toast.clear: `() => void;`
