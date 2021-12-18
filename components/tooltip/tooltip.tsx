import { ComponentCommonProps, ConfigCommonOptions } from '../config-provider';
import React, { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';

import { useClickOutSide } from '../utils/useClickOutSide';
import { getPosition, getIconPosition, Placement } from './placement';
import { useConfigContext } from '../config-provider/useConfigContext';

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
  const ArrowStyle = getIconPosition(placement!);

  return (
    <>
      {createPortal(
        <div css={styles(styleProps)}>
          {visible && (
            <div>
              <div ref={layerRef} className="layer" style={layerStyle}>
                <div className="title">{title}</div>
                {showArrow && <div className="arrow" style={ArrowStyle}></div>}
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

interface TooltipStyleProps
  extends Omit<TooltipProps, keyof ComponentCommonProps>,
    ComponentCommonProps,
    ConfigCommonOptions {}

const styles = (props: TooltipStyleProps) => {
  const { mode } = props.theme;
  const { secondReverseBgColor, reverseTextColor } = props.theme[mode];

  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .layer {
      position: absolute;
      background-color: ${secondReverseBgColor};
      color: ${reverseTextColor};
      border-radius: 4px;
      .title {
        white-space: nowrap;
        word-wrap: break-word;
        padding: 4px 6px;
        width: max-content;
        font-size: 14px;
        min-width: 30px;
        min-height: 16px;
      }
      .arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px 7px 6px 0;
        border-color: transparent ${secondReverseBgColor} transparent transparent;
      }
    }
  `;
};
