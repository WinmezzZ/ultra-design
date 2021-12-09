import { FC } from "react";

export interface TextProps {
}

const Text: FC<TextProps> = (props) => {
  return <span {...props} />
}

export default Text