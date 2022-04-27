import React, { forwardRef, ForwardRefRenderFunction, MutableRefObject } from 'react';
import clsx from 'clsx';
import { layerStyles } from './trigger-styles';
import { CSSTransition } from 'react-transition-group';
import { MergedTriggerProps } from './trigger';
import { useMergeProps } from '../utils/mergeProps';
import usePortal from '../utils/Portal';

interface LayerProps extends MergedTriggerProps {
  childRef: MutableRefObject<HTMLElement | null> | undefined;
  style: React.CSSProperties;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  className?: string;
}

const Layer: ForwardRefRenderFunction<HTMLDivElement, LayerProps> = (p, ref) => {
  const props = useMergeProps({}, p);

  const {
    content,
    placement,
    visible,
    showArrow,
    layerClassName,
    getLayerContainer,
    transitionClassName,
    transitionTimeout,
    childRef,
    style,
    onMouseEnter,
    onMouseLeave,
    name,
    className,
  } = props;

  if (getLayerContainer && !childRef?.current) return null;
  const { Portal } = usePortal({ id: getLayerContainer?.(childRef?.current) || name });

  return (
    <Portal>
      <div
        ref={ref}
        className={clsx(`${name}-layer-wrapper`, layerClassName, className)}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        css={layerStyles(props)}
      >
        <CSSTransition in={visible} unmountOnExit timeout={transitionTimeout} classNames={transitionClassName}>
          <div className={`${name}`}>
            <div className={`${name}__content`}>{content}</div>
            {showArrow && <div className={clsx(`${name}__arrow`, `${name}__arrow--placement__${placement}`)} />}
          </div>
        </CSSTransition>
      </div>
    </Portal>
  );
};

export default forwardRef(Layer);
