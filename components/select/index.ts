import SelectComponent from './select';
import Option from './option';

export type { SelectProps } from './select';
export type { OptionProps } from './option';

type SelectType = typeof SelectComponent;

interface SelectComponentType extends SelectType {
  Option: typeof Option;
}

const Select: SelectComponentType = Object.assign(SelectComponent, {
  Option,
});

export default Select;
