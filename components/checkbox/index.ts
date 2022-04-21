import CheckboxComponent from './checkbox';
import CheckboxGroup from './checkbox-group';

export { CheckboxGroup };
export type { CheckboxProps } from './checkbox';
export type { CheckboxGroupProps } from './checkbox-group';

type CheckboxType = typeof CheckboxComponent;

interface CheckboxComponentType extends CheckboxType {
  Group: typeof CheckboxGroup;
}

const Checkbox = CheckboxComponent as CheckboxComponentType;

Checkbox.Group = CheckboxGroup;

export default Checkbox;
