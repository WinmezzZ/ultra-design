import { HTMLMotionProps, motion } from 'framer-motion';

import { tx } from '@/utils/twind';
import { useMergeProps } from '@/utils/use-merge-props';
import { withStyle } from '@/utils/with-style';
import { useState } from 'react';

export interface SwitchProps extends Omit<HTMLMotionProps<'span'>, 'type'> {
  color?: string;
}

const Switch = withStyle((props: SwitchProps) => {
  const { ...rest } = useMergeProps(
    { size: 'md', color: 'blue', variant: 'solid' },
    props,
  );
  const [selected, setSelected] = useState(false);

  const toggleSwitch = () => setSelected(!selected);

  return (
    <span 
      className={tx(
        'bg-gray-300 w-14 h-8 px-1 inline-flex justify-start items-center rounded-full cursor-pointer', 
        'data-[selected=true]:(justify-end bg-blue-500 dark:bg-cyan-500)'
        )} 
      data-selected={selected} 
      onClick={toggleSwitch}
    >
      <motion.span {...rest} 
        className={tx('w-6 h-6 bg-white rounded-full')} 
        layout 
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }} 
      />
    </span>
  );
});

export default Switch;
