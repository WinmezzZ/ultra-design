import { FC } from 'react';
import Trigger, { TriggerProps } from '../trigger';
import { useMergeProps } from '../utils/mergeProps';
import { dropdownStyles } from './dropdown-styles';

export interface DropdownProps extends TriggerProps {}

export type MergedDropdownProps = typeof defaultProps & DropdownProps;

const defaultProps = {
  name: 'ultra-dropdown',
  trigger: 'click',
  transitionClassName: 'ultra-dropdown-layer-slide',
};

const Dropdown: FC<DropdownProps> = p => {
  const props = useMergeProps(defaultProps, p);

  return <Trigger {...props} css={dropdownStyles(props)} />;
};

Dropdown.displayName = 'UltraDropdown';

export default Dropdown;
