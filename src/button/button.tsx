import { HTMLMotionProps, motion } from 'framer-motion';

import { NumberSize, Size } from '@/types/size';
import { tx } from '@/utils/twind';
import { mergeProps } from '@/utils/use-merge-props';
import { isNumber } from 'lodash-es';
import { withStyle } from '@/utils/with-style';
import { Color, ColorMap } from '@/types/color';
import Ripple from '@/ripple/ripple';
import { ReactNode } from 'react';
import { useRipple } from '@/ripple/use-ripple';

const buttonSizes = {
  xs: 'h-7 px-3 text-sm',
  sm: 'h-8 px-4',
  md: 'h-9 px-5',
  lg: 'h-10 px-6',
  xl: 'h-11 px-7 text-lg',
};


const buttonVariants = (color: string) => {
  return {
    solid: [
      `text-white border-transparent bg-${color}-500 disabled:bg-${color}-500 hover:bg-${color}-400 active:bg-${color}-400`,
    ],
    outline: [
      `border-${color}-500 text-${color}-500 bg-white disabled:bg-white`,
    ],
    light: [
      `border-transparent text-${color}-500 bg-${color}-50 disabled:bg-${color}-50 hover:bg-${color}-100 active:bg-${color}-200`,
    ],
    ghost: [
      `border-current text-${color}-500 bg-white disabled:bg-white hover:bg-${color}-50 active:bg-${color}-500`,
    ],
    link: [
      `border-transparent underline underline-offset-2 text-${color}-500 disabled:text-${color}-500 hover:text-${color}-600 active:text-${color}-700`,
    ],
  };
};

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'type'> {
  variant?: 'solid' | 'outline' | 'light' | 'ghost' | 'link';
  size?: Size;
  color?: Color;
  loading?: boolean;
  radius?: NumberSize;
  disableRipple?: boolean;
}

const Button = withStyle<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { loading, disabled, variant, radius, className, size, color, disableRipple, children, onClick, ...rest } = mergeProps(
    { size: 'md', color: 'primary', variant: 'outline' },
    props,
  );
  const rounded = radius ? (isNumber(radius) ? `-[${radius}px]` : `-${radius}`) : '-lg';

  const { ripples, onClick: onRippleClick, onClear } = useRipple();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disableRipple || disabled) return;
    onRippleClick(event);
    onClick?.(event);
  };

  return (
    <motion.button
      className={tx(
        'inline-flex items-center justify-center relative',
        'select-none appearance-none outline-none',
        'whitespace-nowrap border-medium border-solid transition-colors overflow-hidden',
        'disabled:(cursor-not-allowed opacity-50)',
        `focus-visible:(ring ring-${color}-300)`,
        `rounded${rounded} cursor-pointer`,
        buttonSizes[size],
        buttonVariants(ColorMap[color])[variant],
        className,
      )}
      disabled={disabled || loading}
      whileTap={{
        scale: disabled ? undefined : 0.95,
      }}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      {children as ReactNode}
      {!disableRipple && <Ripple ripples={ripples} onClear={onClear} color={`${ColorMap[color]}-100`} />}
    </motion.button>
  );
});

export default Button;
