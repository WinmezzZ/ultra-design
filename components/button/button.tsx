import { FC } from "react";
import Text from "../text";

export interface ButtonProps {
  theme: 'dark' | 'light'
}

const Button: FC<ButtonProps> = (props) => {
  return <button {...props}>
    <Text></Text>
  </button>
}

Button.defaultProps = {
  theme: 'light'
}

export default Button
