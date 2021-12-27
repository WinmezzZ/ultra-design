import React, { FC, useEffect, useRef, useState } from 'react';
import { useClickOutSide } from '../utils/useClickOutSide';
import { getPosition, Placement } from './placement';
import Layer from './layer';
import { TooltipCSSProps } from './tooltip-styles';
import { SerializedStyles } from '@emotion/react';

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
   * @description.zh-CN 浮层渲染父节点，默认渲染到 body 上
   * @description.en-US layer parent node, render in body element default
   * @default () => document.body;
   */
  getLayerContainer?: (trigger: HTMLElement) => HTMLElement;
  /**
   * @description.zh-CN 弹出框的类名
   * @description.en-US tclassName of layer box
   */
  layerClassName?: string;
  /**
   * @description.zh-CN 渐变的类名，提供后可以自定义渐变效果
   * @description.en-US className of `CSSTransition`, for custom transition
   * @default 'ultra-tooltip-layer-fade'
   */
  transitionClassName?: string;
  /**
   * @description.zh-CN 渐变的持续的时间，尽量和 css 中的保持一致，此值将提供给 `CSSTransition`
   * @description.en-US timeout of `CSSTransition`, be best set to same as transition duration in css
   * @default 300
   */
  transitionTimeout?: number;

  /**
   * @description.zh-CN wrapper container id
   * @description.en-US 容器 id
   */
  id?: string;

  cssProps?: (props: TooltipCSSProps) => SerializedStyles;
}

const Tooltip: FC<TooltipProps> = props => {
  const {
    children,
    trigger,
    placement,
    defaultVisible,
    visible: customVisible,
    onVisibleChange,
    showDelay,
    hideDelay,
    showArrow,
    offset,
    getLayerContainer,
  } = props;
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

  const childRef = useRef<HTMLSpanElement>(null);

  const updateRect = () => {
    if (!childRef.current) return;
    const childRect = childRef.current.getBoundingClientRect();

    if (!getLayerContainer) {
      const { scrollTop, scrollLeft } = document.documentElement;

      setRect({
        ...childRect,
        width: childRect.width || rect.right - rect.left,
        height: childRect.height || rect.bottom - rect.top,
        top: childRect.top + scrollTop,
        bottom: childRect.bottom + scrollTop,
        left: childRect.left + scrollLeft,
        right: childRect.right + scrollLeft,
      });
    } else {
      const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = childRef.current;

      setRect({
        ...childRect,
        width: offsetWidth,
        height: offsetHeight,
        top: offsetTop,
        bottom: offsetTop + offsetHeight,
        left: offsetLeft,
        right: offsetLeft + offsetWidth,
      });
    }
  };

  useEffect(() => {
    updateRect();
  }, [childRef, visible]);

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

    timer.current = window.setTimeout(() => {
      handler(false);
    }, hideDelay);
  };

  useEffect(() => {
    if (customVisible === undefined) return;

    changeVisible(customVisible);
  }, [customVisible]);

  const mouseEventHandler = (next: boolean) => trigger === 'hover' && changeVisible(next);
  const clickEventHandler = () => trigger === 'click' && changeVisible(!visible);

  useClickOutSide(childRef, clickEventHandler);

  const isElement = React.isValidElement(children);

  const layerStyle = getPosition(placement!, rect, layerOffset);

  const childProps = {
    ref: childRef,
    onMouseEnter: () => mouseEventHandler(true),
    onMouseLeave: () => mouseEventHandler(false),
    onClick: (e: React.MouseEvent) => {
      clickEventHandler();
      isElement && children.props.onClick?.(e);
    },
  };

  return (
    <>
      {React.cloneElement(isElement ? children : <span>{children}</span>, childProps)}
      <Layer
        id="tooltip"
        {...props}
        visible={visible}
        childRef={childRef}
        style={layerStyle}
        onMouseEnter={() => mouseEventHandler(true)}
        onMouseLeave={() => mouseEventHandler(false)}
      />
    </>
  );
};

Tooltip.defaultProps = {
  trigger: 'hover',
  defaultVisible: false,
  placement: 'bottom',
  showDelay: 150,
  hideDelay: 150,
  offset: 12,
  showArrow: true,
  transitionClassName: 'ultra-tooltip-layer-fade',
  transitionTimeout: 300,
};

export default Tooltip;
