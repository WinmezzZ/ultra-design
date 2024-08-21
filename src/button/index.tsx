import { withStyle } from '@/utils/with-style';
import { useMergeProps } from '@/utils/use-merge-props';
import { motion, HTMLMotionProps } from 'framer-motion'
import { tx } from '@/utils/twind';

const buttonSizes = {
  xs: 'h-6 px-3 text-sm',
  sm: 'h-7 px-4',
  md: 'h-8 px-5',
  lg: 'h-9 px-6',
  xl: 'h-10 px-7 text-lg',
};

const buttonVariants = (color: string) => {
  return {
    solid: [
      `text-white border-transparent bg-${color}-500 disabled:bg-${color}-500 hover:bg-${color}-600 active:bg-${color}-700`,
    ],
    outline: [
      `border-current text-${color}-500 bg-white disabled:bg-white hover:bg-${color}-50 active:bg-${color}-100`,
    ],
    light: [
      `border-transparent text-${color}-500 bg-${color}-50 disabled:bg-${color}-50 hover:bg-${color}-100 active:bg-${color}-200`,
    ],
    subtle: [
      `border-transparent text-${color}-500 bg-transparent disabled:bg-transparent hover:bg-${color}-100 active:bg-${color}-200`,
    ],
    link: [
      `border-transparent underline underline-offset-2 text-${color}-500 disabled:text-${color}-500 hover:text-${color}-600 active:text-${color}-700`,
    ],
  };
};

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'type'> {
  variant?: 'solid' | 'outline' | 'light' | 'subtle' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  loading?: boolean
}

const Button = withStyle((props: ButtonProps) => {
  const { loading, disabled, variant, className, size, color, ...rest } = useMergeProps({ size: 'md', color: 'blue', variant: 'solid' }, props)
  return <motion.button className={tx(
    'inline-flex items-center justify-center ',
    'select-none appearance-none outline-none',
    'whitespace-nowrap border transition-colors',
    'disabled:(cursor-not-allowed opacity-50)',
    `focus-visible:(ring ring-${color}-300)`,
    buttonSizes[size],
    buttonVariants(color)[variant],
    className
  )} disabled={disabled || loading}
   whileTap={{ scale: 0.85 }} {...rest}></motion.button>
})

export default Button;
