import { useCallbackState } from 'winhooks';
import { CSSProperties, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { useMergeProps } from '../utils/mergeProps';

export interface RippleProps {
  /**
   * @description.zh-CN 效果持续时间
   * @description.en-US effect duration
   * @default true
   */
  during?: number;
  /**
   * @description.zh-CN 涟漪的颜色
   * @description.en-US ripple effect color
   * @default true
   */
  color?: string;
}

const defaultProps = {
  during: 600,
  color: 'rgba(0, 0, 0, .1)',
};

const Ripple: React.FC<RippleProps> = p => {
  const props = useMergeProps(defaultProps, p);
  const { during, color } = props;

  const timer = useRef({} as NodeJS.Timeout);
  const [rippleStyle, setRippleStyle] = useCallbackState<Readonly<CSSProperties>>({
    opacity: 0,
    transform: 'translate(-50%, -50%)',
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const onMouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();

    const { pageX, pageY, currentTarget } = ev;

    const rect = currentTarget.getBoundingClientRect();

    const left = pageX - (rect.left + window.scrollX);
    const top = pageY - (rect.top + window.scrollY);
    const size = Math.max(rect.width, rect.height);

    setRippleStyle(
      {
        ...rippleStyle,
        left,
        top,
        opacity: 1,
        transform: 'translate(-50%, -50%)',
        transition: 'initial',
        backgroundColor: color,
      },
      () => {
        timer.current = setTimeout(() => {
          setRippleStyle({
            ...rippleStyle,
            opacity: 0,
            transform: `scale(${size / 9})`,
            transition: `all ${during}ms`,
          });
        }, 50);
      },
    );
  };

  return (
    <div css={styles} onMouseDown={onMouseDown} {...props}>
      <s style={rippleStyle} />
    </div>
  );
};

export default Ripple;

const styles = css`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  s {
    position: absolute;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    pointer-events: none;
  }
`;
