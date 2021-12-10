import { FC } from 'react';

export interface TextProps {
  color: string;
}

const Text: FC<TextProps> = props => {
  return <span {...props} />;
};

export default Text;
