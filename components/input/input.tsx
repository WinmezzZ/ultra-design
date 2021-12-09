import { FC } from "react";

export interface InputProps {
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

const Input: FC<InputProps> = (props) => {
  const { theme, size, ...rest } = props
  return <input {...rest} />
}

export default Input
