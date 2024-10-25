import { HTMLMotionProps, motion } from 'framer-motion';

import { NumberSize, Size } from '@/types/size';
import { tx } from '@/utils/twind';
import { useMergeProps } from '@/utils/use-merge-props';
import { isNumber } from 'lodash-es';
import { withStyle } from '@/utils/with-style';

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
  size?: Size;
  color?: string;
  loading?: boolean;
  radius?: NumberSize;
}

const Button = withStyle((props: ButtonProps) => {
  const { loading, disabled, variant, radius, className, size, color, ...rest } = useMergeProps(
    { size: 'md', color: 'blue', variant: 'solid' },
    props,
  );
  const rounded = radius ? (isNumber(radius) ? `-[${radius}px]` : `-${radius}`) : '';

  return (
    <motion.button
      className={tx(
        'inline-flex items-center justify-center ',
        'select-none appearance-none outline-none',
        'whitespace-nowrap border transition-colors',
        'disabled:(cursor-not-allowed opacity-50)',
        `focus-visible:(ring ring-${color}-300)`,
        `rounded${rounded}`,
        'dark:(text-white bg-cyan-500)',
        buttonSizes[size],
        buttonVariants(color)[variant],
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    ></motion.button>
  );
});

export default Button;
