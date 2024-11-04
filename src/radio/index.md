# Radio

This is an example component.

```jsx title="基本用法"
import { Radio } from 'ultra-design';

export default () => (
  <div>
    <Radio>Radio</Radio>
    <Radio defaultChecked>Radio</Radio>
  </div>
);
```

#### 禁用

```jsx
import { Radio } from 'ultra-design';

export default () => (
  <div>
    <Radio disabled>Radio</Radio>
    <Radio defaultChecked disabled>
      Radio
    </Radio>
  </div>
);
```

#### RadioGroup 组

```jsx
import { RadioGroup, Radio } from 'ultra-design';

export default () => (
  <div>
    <RadioGroup defaultValue={['1']}>
      <Radio value="1">Radio1</Radio>
      <Radio value="2">Radio2</Radio>
    </RadioGroup>
  </div>
);
```

#### orientation 方向

```jsx
import { RadioGroup, Radio } from 'ultra-design';

export default () => (
  <div>
    <RadioGroup orientation="horizontal">
      <Radio value="1">Radio1</Radio>
      <Radio value="2">Radio2</Radio>
    </RadioGroup>
  </div>
);
```
