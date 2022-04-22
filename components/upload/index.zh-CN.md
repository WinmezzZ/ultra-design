---
nav:
  title: 组件
  path: /components
group:
  title: Form 表单
  order: 5
---

# Upload 上传

## 基本使用

```jsx
import React from 'react';
import { Upload } from 'ultra-design';

export default () => {
  return <Upload />;
};
```

## 默认图片

```jsx
import React from 'react';
import { Upload, Button } from 'ultra-design';

export default () => {
  const onChange = file => {
    console.log(file);
  };
  return (
    <div>
      <Upload
        fileList={[
          { url: '//www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' },
          {
            url: 'https://p9.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/70ca9f3173af4babad46a5649086f5e9?from=pc',
          },
          {
            url: '//p26.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/a183894d7c354a7cbb4e51489c325050~tplv-obj:1920:1080.image?from=post',
          },
          {
            url: '//p3.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/1675928a50604fc793bcf9826924abfc~tplv-obj:3840:2160.image?from=post',
          },
          {
            url: 'https://p9.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/d77245632fcd4edf8f7a2e084d5ad624?from=pc',
          },
          {
            url: '//p3.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/b663dd598fc242f582f5a143f0f4ca1c~tplv-obj:3840:2160.image?from=post',
          },
          {
            url: '//p3.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/fa5acc8251ac46e49900b215dcd6029b~tplv-obj:3840:2160.image?from=post',
          },
          {
            url: '//p26.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/c894353f71c7481c8ddc1bfe5e0fe770~tplv-obj:1240:580.image?from=post',
          },
        ]}
        onChange={onChange}
      />
    </div>
  );
};
```

## 单图

通过设置 `maxCount={1}` 启用单图模式

```jsx
import React from 'react';
import { Upload, Button } from 'ultra-design';

export default () => {
  const onChange = file => {
    console.log(file);
  };
  return (
    <div>
      <Upload
        fileList={[
          {
            url: '//p26.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/c894353f71c7481c8ddc1bfe5e0fe770~tplv-obj:1240:580.image?from=post',
          },
        ]}
        maxCount={1}
        onChange={onChange}
        multiple
      ></Upload>
    </div>
  );
};
```

## 错误处理

默认情况下上传错误不会停止上传行为，所有的错误都会合并到 onChange 回调参数数据中

有三种类型的错误，你可以自己处理这个错误事件

- `onOverSize:` over size error(errorCode: 0), 返回 `continue` 将过滤错误图像，返回 `break` 将删除所有选择的图像

- `onOverExtentions:` over count error(errorCode: 1), 返回 `continue` 将过滤错误图像, 将过滤错误图像，返回 `break` 将删除所有选择的图像

- `onOverCount:` over count error(errorCode: 2), 返回 `false` 将删除所有选择的图像

```tsx
import React from 'react';
import { Upload } from 'ultra-design';

export default () => {
  return (
    <div>
      你可以选择多张图片
      <div>
        <h3>onOverSize</h3>
        <div style={{ paddingLeft: 100 }}>
          <Upload maxSize={1} onOverSize={() => {}} footer="default" />
          <Upload maxSize={1} onOverSize={() => 'continue'} footer="return continue" />
          <Upload maxSize={1} onOverSize={() => 'break'} footer="return break" />
          <Upload maxSize={1} renderError={img => img.errorCode === 'OVER_SIZE' && 'over size'} footer="render error" />
        </div>
      </div>
      <div>
        <h3>onOverExtensions</h3>
        <div style={{ paddingLeft: 100 }}>
          <Upload extensions={[]} onOverExtensions={() => {}} footer="default" />
          <Upload extensions={[]} onOverExtensions={() => 'continue'} footer="return continue" />
          <Upload extensions={[]} onOverExtensions={() => 'break'} footer="return break" />
          <Upload
            extensions={[]}
            renderError={img => img.errorCode === 'OVER_EXTENSTIONS' && 'over extensions'}
            footer="render error"
          />
        </div>
      </div>
      <div>
        <h3>onOverCount</h3>
        选择超过 2 张图片
        <div style={{ paddingLeft: 100 }}>
          <Upload maxCount={1} onOverCount={() => {}} footer="default" />
          <Upload maxCount={1} onOverCount={() => false} footer="return false" />
        </div>
      </div>
    </div>
  );
};
```

## 自定义渲染

```jsx
import React from 'react';
import { Upload } from 'ultra-design';

export default () => {
  return <Upload footer={<div style={{ margin: 10 }}>图片大小不得超过3 M</div>}>选择图片</Upload>;
};
```

<API src="./index.ts" />
