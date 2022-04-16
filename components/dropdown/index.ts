import DropdownComponent from './dropdown';
import DropdownTitle from './dropdown-title';
import DropdownItem from './dropdown-item';
import Divider from '../divider';

export { DropdownItem, DropdownTitle, Divider };
export type { DropdownProps } from './dropdown';
export type { DropdownItemProps } from './dropdown-item';

type DropdownType = typeof DropdownComponent;

interface DropdownComponentType extends DropdownType {
  Title: typeof DropdownTitle;
  Item: typeof DropdownItem;
  Divider: typeof Divider;
}

const Dropdown = DropdownComponent as DropdownComponentType;

Dropdown.Title = DropdownTitle;
Dropdown.Item = DropdownItem;
Dropdown.Divider = Divider;

export default Dropdown;
