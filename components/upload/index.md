---
nav:
  title: Components
  path: /components
group:
  title: Form
  order: 5
---

# Upload

## Basic Usage

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
        multiple
      >
        <Button type="primary">上传</Button>
      </Upload>
    </div>
  );
};
```

<API src="./index.ts" />
