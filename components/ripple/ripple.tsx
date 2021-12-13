import { useCallbackState } from '../utils/useCallbackState';
import { CSSProperties, useEffect, useRef } from 'react';

export interface RipplesProps {
  during?: number;
  color?: string;
  onMouseDown?: (ev: React.MouseEvent<HTMLDivElement>) => any;
  className?: string;
}

type State = Readonly<CSSProperties>;

const boxStyle: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  top: 0,
  left: 0,
};

const Ripple: React.FC<RipplesProps> = props => {
  const { children, during, color, onMouseDown: _onMouseDown, className } = props;

  const timer = useRef({} as NodeJS.Timeout);
  const [rippleStyle, setRippleStyle] = useCallbackState<State>({
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0,
    width: 35,
    height: 35,
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const onMouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
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

    if (_onMouseDown) _onMouseDown(ev);
  };

  return (
    <div {...props} className={`ultra-ripple ${className}`.trim()} style={boxStyle} onMouseDown={onMouseDown}>
      {children}
      <s style={rippleStyle} />
    </div>
  );
};

export default Ripple;

Ripple.defaultProps = {
  during: 600,
  color: 'rgba(0, 0, 0, .1)',
  className: '',
  onMouseDown: () => {
    //
  },
};
