import { FC } from "react";

export interface ButtonProps {
  /**
   * @description.zh-CN 主题色
   * @description.en-US theme color
   */
  theme?: 'dark' | 'light'
  /**
   * @description.zh-CN 尺寸
   * @description.en-US size
   * @default 'middle'
   */
  size?: Size
}

export type Size = 'mini' | 'small' | 'middle' | 'large' | 'larger'

const Button: FC<ButtonProps> = (props) => {
  const { theme, size, ...rest } = props
  return <button {...rest} />
}

export default Button
