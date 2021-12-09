import { FC } from "react";

export interface ButtonProps {
  theme: 'dark' | 'light'
}

const Button: FC<ButtonProps> = (props) => {
  return <button {...props}>
  </button>
}

Button.defaultProps = {
  theme: 'light'
}

export default Button
