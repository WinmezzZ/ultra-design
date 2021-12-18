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

export interface TooltipProps {
  /**
   * @description.zh-CN 提示内容
   * @description.en-US tooltip content
   */
  title?: React.ReactNode;
  /**
   * @description.zh-CN 触发提示框的方式
   * @description.en-US trigger mode
   * @default 'hover'
   */
  trigger?: 'hover' | 'click';
  /**
   * @description.zh-CN 提示框出现的方位
   * @description.en-US tooltip position
   * @default 'hover'
   */
  placement?: Placement;
  /**
   * @description.zh-CN 是否默认显示
   * @description.en-US position of the tooltip relative to the target
   * @default true
   */
  defaultVisible?: boolean;
  /**
   * @description.zh-CN 是否显示
   * @description.en-US set visible as default
   * @default false
   */
  visible?: boolean;
  /**
   * @description.zh-CN 当提示框状态改变时触发
   * @description.en-US call when visibility of the tooltip is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @description.zh-CN 在提示显示前的延迟
   * @description.en-US delay before tooltip is shown
   * @default 100
   */
  showDelay?: number;
  /**
   * @description.zh-CN 关闭提示前的延迟
   * @description.en-US delay before tooltip is hidden (only work in 'hover' mode)
   * @default 100
   */
  hideDelay?: number;
  /**
   * @description.zh-CN 是否显示箭头
   * @description.en-US show arrow icon
   * @default true
   */
  showArrow?: boolean;
  /**
   * @description.zh-CN 提示框与目标之间的偏移
   * @description.en-US distance between pop-up and target
   * @default 'hover'
   */
  offset?: number;
  /**
   * @description.zh-CN 弹出框的类名
   * @description.en-US tclassName of layer box
   */
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

  const updateRect = () => {
    if (!childRef.current) return;
    const childRect = childRef.current.getBoundingClientRect();

    console.log(childRect);

    setRect({
      ...childRect,
      width: childRect.width,
      height: childRect.height,
      top: childRect.top + document.documentElement.scrollTop,
      bottom: childRect.bottom + document.documentElement.scrollTop,
      left: childRect.left + document.documentElement.scrollLeft,
      right: childRect.right + document.documentElement.scrollLeft,
    });
  };

  useEffect(() => {
    updateRect();
  }, [childRef]);

  useEffect(() => {
    window.addEventListener('resize', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
    };
  }, []);

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
