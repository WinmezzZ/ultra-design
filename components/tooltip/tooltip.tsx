import { FC } from 'react';

export interface TooltipProps {}

const Tooltip: FC<TooltipProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Tooltip;
