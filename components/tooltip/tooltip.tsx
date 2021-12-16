import { ComponentCommonProps } from '../config-provider';
import React, { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';

import { useClickOutSide } from '../utils/useClickOutSide';
import { getPosition, Placement } from './placement';
export interface TooltipProps extends Partial<ComponentCommonProps> {
  title?: React.ReactNode;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  showDelay?: number;
  hideDelay?: number;
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
  } = props;
  const [visible, setVisible] = useState(defaultVisible);
  const [rect, setRect] = useState({} as DOMRect);
  const timer = useRef<number>();

  // const childRef = useCallback((node: Element) => {
  //   if (node !== null) {
  //     console.log(node);
  //     setRect(node.getBoundingClientRect());
  //   }
  // }, []);

  const childRef = useRef<HTMLElement>();
  const layerRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    if (!childRef.current) return;
    setRect(childRef.current.getBoundingClientRect());
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

  // const updateRect = () => {
  //   const position = getPosition(placement!, getRect(layerRef));

  //   console.log(position);

  //   setRect(position);
  // };

  // useEffect(() => {
  //   updateRect();
  // }, [visible]);

  return (
    <>
      {createPortal(
        <div css={styles}>
          {visible && (
            <div>
              <div ref={layerRef} className="layer" style={getPosition(placement!, rect)}>
                <div className="title">{title}</div>
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
};

export default Tooltip;

const styles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  .layer {
    position: absolute;
    background-color: #ccc;
    border-radius: 4px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    .title {
      white-space: nowrap;
      word-wrap: break-word;
      padding: 4px 6px;
      min-width: 30px;
      width: max-content;
      min-height: 20px;
    }
  }
`;
