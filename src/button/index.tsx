import { ComponentProps } from 'react';
import { withStyle } from '@/utils/with-style';
import { useMergeProps } from '@/utils/use-merge-props';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  type?: 'primary' | 'ghost' | 'text'
  loading?: boolean
}

const Button = withStyle((props: ButtonProps) => {
  const { loading, type, ...rest } = useMergeProps({ type: 'primary' }, props)
  return <button {...rest}></button>
})

export default Button;
