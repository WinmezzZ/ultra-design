import { FC } from "react";
import { m, HTMLMotionProps,  LazyMotion, AnimatePresence } from "framer-motion";
import { RippleType } from "./use-ripple";
import { tx } from "@/utils/twind";

export interface RippleProps extends HTMLMotionProps<"span"> {
  color: string;
  duration?: number;
  ripples: RippleType[];
  onClear: (key: React.Key) => void;
}

const domAnimation = () => import('@/dom-animation').then((res) => res.default);

const Ripple: FC<RippleProps> = ({ color, duration = 600, ripples, onClear }) => {
  return (
    <>
      {ripples.map((ripple, index) => (
        <LazyMotion key={ripple.key} features={domAnimation}>
          <AnimatePresence mode="popLayout">
            <m.span
              key={index}
              initial={{ opacity: 0.35, scale: 0 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={{ duration: duration / 1000 }}
              exit={{ opacity: 0 }}
              onAnimationComplete={() => {
                console.log('onAnimationComplete')
                onClear(ripple.key)
              }}
              className={tx(`absolute rounded-full pointer-events-none bg-${color}`)}
              style={{
                width: ripple.size,
                height: ripple.size,
                top: ripple.y,
                left: ripple.x,
              }}
            />
          </AnimatePresence>
        </LazyMotion>
      ))}
    </>
  );
};

Ripple.displayName = "UltraRipple";

export default Ripple;