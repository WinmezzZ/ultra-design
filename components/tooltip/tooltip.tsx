import { ComponentCommonProps } from '../config-provider';
import React, { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';

import { useClickOutSide } from '../utils/useClickOutSide';
export interface TooltipProps extends Partial<ComponentCommonProps> {
  title?: string;
  children: React.ReactElement;
  trigger?: 'hover' | 'click';
}

const Tooltip: FC<TooltipProps> = props => {
  const { children, trigger, title } = props;
  const [visible, setVisible] = useState(false);

  const [rect, setRect] = useState({} as DOMRect);

  // const childRef = useCallback((node: Element) => {
  //   if (node !== null) {
  //     console.log(node);
  //     setRect(node.getBoundingClientRect());
  //   }
  // }, []);

  const childRef = useRef<HTMLElement>();
  const layerRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    console.log(childRef.current);
    if (!childRef.current) return;
    setRect(childRef.current.getBoundingClientRect());
  }, [childRef]);

  useClickOutSide(layerRef, () => trigger === 'click' && setVisible(false), [childRef]);

  useEffect(() => {
    if (!childRef.current) return;
    setRect(childRef.current.getBoundingClientRect());
  }, [childRef]);

  const child = React.cloneElement(children, {
    ref: childRef,
    onMouseEnter: () => {
      if (trigger !== 'hover') return;
      setVisible(true);
    },
    onMouseLeave: () => {
      if (trigger !== 'hover') return;
      setVisible(false);
    },
    onClick: () => {
      if (trigger !== 'click') return;
      setVisible(!visible);
    },
  });

  return (
    <>
      {createPortal(
        <div css={styles}>
          {visible && (
            <div>
              <div ref={layerRef} className="layer" style={{ top: rect.bottom, left: rect.left }}>
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
      min-height: 20px;
    }
  }
`;
