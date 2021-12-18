import { ComponentCommonProps } from '../config-provider';
import React, { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useClickOutSide } from '../utils/useClickOutSide';
import { getPosition, Placement } from './placement';
import { useConfigContext } from '../config-provider/useConfigContext';
import clsx from 'clsx';
import { toolTipStyles } from './tooltip-styles';

export type PositionRect = Omit<DOMRect, 'toJSON'>;

const defaultPositionRect: PositionRect = {
  top: -1000,
  left: -1000,
  bottom: -1000,
  right: -1000,
  width: 0,
  height: 0,
  x: -1000,
  y: -1000,
};

export interface TooltipProps extends Partial<ComponentCommonProps> {
  title?: React.ReactNode;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  showDelay?: number;
  hideDelay?: number;
  showArrow?: boolean;
  offset?: number;
  layerClassName?: string;
}

const Tooltip: FC<TooltipProps> = props => {
  const {
    children,
    trigger,
    title,
    placement,
    defaultVisible,
    visible: customVisible,
    onVisibleChange,
    showDelay,
    hideDelay,
    showArrow,
    offset,
    layerClassName,
  } = props;
  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };
  const [visible, setVisible] = useState(defaultVisible);
  const [rect, setRect] = useState<PositionRect>(defaultPositionRect);
  const timer = useRef<number>();

  // const childRef = useCallback((node: Element) => {
  //   if (node !== null) {
  //     console.log(node);
  //     setRect(node.getBoundingClientRect());
  //   }
  // }, []);

  const layerOffset = showArrow ? offset! : offset! - 6;

  const childRef = useRef<HTMLElement>();
  const layerRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    if (!childRef.current) return;
    const childRect = childRef.current.getBoundingClientRect();

    setRect({
      ...childRect,
      width: childRect.width,
      height: childRect.height,
      top: childRect.top + document.documentElement.scrollTop,
      bottom: childRect.bottom + document.documentElement.scrollTop,
      left: childRect.left + document.documentElement.scrollLeft,
      right: childRect.right + document.documentElement.scrollLeft,
    });
  }, [childRef]);

  const changeVisible = (visible: boolean) => {
    const clear = () => {
      clearTimeout(timer.current);
      timer.current = undefined;
    };

    const handler = (visible: boolean) => {
      setVisible(visible);
      onVisibleChange?.(visible);
      clear();
    };

    clear();

    if (visible) {
      timer.current = window.setTimeout(() => handler(true), showDelay);

      return;
    }

    timer.current = window.setTimeout(() => handler(false), hideDelay);
  };

  useEffect(() => {
    if (customVisible === undefined) return;

    changeVisible(customVisible);
  }, [customVisible]);

  const mouseEventHandler = (next: boolean) => trigger === 'hover' && changeVisible(next);
  const clickEventHandler = () => trigger === 'click' && changeVisible(!visible);

  useClickOutSide(layerRef, clickEventHandler, [childRef]);

  if (!children) return null;

  const resolvedChild = React.isValidElement(children) ? children : <span>{children}</span>;

  const child = React.cloneElement(resolvedChild, {
    ref: childRef,
    onMouseEnter: () => mouseEventHandler(true),
    onMouseLeave: () => mouseEventHandler(false),
    onClick: clickEventHandler,
  });

  const layerStyle = getPosition(placement!, rect, layerOffset);

  return (
    <>
      {createPortal(
        <div css={toolTipStyles(styleProps)}>
          {visible && (
            <div>
              <div ref={layerRef} className={clsx('layer', layerClassName)} style={layerStyle}>
                <div className="title">{title}</div>
                {showArrow && <div className={clsx('arrow', `arrow-placement__${placement}`)}></div>}
              </div>
            </div>
          )}
        </div>,
        document.body,
      )}
      {child}
    </>
  );
};

Tooltip.defaultProps = {
  trigger: 'hover',
  defaultVisible: false,
  placement: 'bottom',
  showDelay: 100,
  hideDelay: 100,
  offset: 12,
  showArrow: true,
};

export default Tooltip;
