import InternalSelect from './select';
export type { SelectProps } from './select';
import { Option } from './select-option';
export type { SelectOptionProps } from './select-option';

const Select = Object.assign(InternalSelect, {
  Option
});

export default Select;

export const SelectOption = Option;
