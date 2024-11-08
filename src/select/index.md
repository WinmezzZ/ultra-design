# Button

This is an example component.

#### 基本使用

```jsx
import { Select } from 'ultra-design';

export default () => (
  <Select defaultValue="peach" style={{ width: 200 }} searchable>
    <Select.Option value="apple">Apple1</Select.Option>
    <Select.Option value="blueberry">Blueberry</Select.Option>
    <Select.Option value="watermelon">Watermelon</Select.Option>
    <Select.Option value="banana" disabled>
      Banana
    </Select.Option>
    <Select.Option value="orange">Orange</Select.Option>
    <Select.Option value="pear">Pear</Select.Option>
    <Select.Option value="peach">Peach</Select.Option>
    <Select.Option value="plum">Plum</Select.Option>
  </Select>
);
```
