import DropdownComponent from './dropdown';
import DropdownItem from './dropdown-item';
import Divider from '../divider';

export { DropdownItem };
export type { DropdownProps } from './dropdown';
export type { DropdownItemProps } from './dropdown-item';

type DropdownType = typeof DropdownComponent;

interface DropdownComponentType extends DropdownType {
  DropdownItem: typeof DropdownItem;
  Divider: typeof Divider;
}

const Dropdown = DropdownComponent as DropdownComponentType;

Dropdown.DropdownItem = DropdownItem;
Dropdown.Divider = Divider;

export default Dropdown;
