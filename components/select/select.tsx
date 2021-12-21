import { FC } from 'react';

export interface SelectProps {
  color: string;
}

const Select: FC<SelectProps> = props => {
  return <span {...props} />;
};

export default Select;
