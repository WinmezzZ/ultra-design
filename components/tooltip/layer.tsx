import React, { FC, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { toolTipCSS } from './tooltip-styles';
import { CSSTransition } from 'react-transition-group';
import { TooltipProps } from './tooltip';
import { useConfigContext } from '../config-provider/useConfigContext';
import usePortal from '../utils/usePortal';

interface LayerProps extends TooltipProps {
  childRef: MutableRefObject<HTMLElement | null> | undefined;
  style: React.CSSProperties;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
}

const Layer: FC<LayerProps> = props => {
  const {
    title,
    placement,
    visible,
    showArrow,
    layerClassName,
    getLayerContainer,
    cssProps,
    transitionClassName,
    transitionTimeout,
    childRef,
    style,
    onMouseEnter,
    onMouseLeave,
    id,
  } = props;

  const configContext = useConfigContext();
  const styleProps = { ...configContext, ...props };

  if (!childRef) return null;

  const portal = usePortal(id!);
  const mountNode: HTMLElement =
    childRef.current && getLayerContainer ? getLayerContainer(childRef.current) : portal || document.body;

  if (!portal) return null;

  return createPortal(
    <div css={[toolTipCSS(styleProps), cssProps?.(styleProps)]}>
      <div>
        <div
          className={clsx('ultra-layer-wrapper', layerClassName)}
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <CSSTransition in={visible} unmountOnExit timeout={transitionTimeout!} classNames={transitionClassName}>
            <div className="ultra-tooltip">
              <div className="ultra-tooltip__title">{title}</div>
              {showArrow && (
                <div className={clsx('ultra-tooltip__arrow', `ultra-tooltip__arrow--placement__${placement}`)} />
              )}
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>,
    mountNode,
  );
};

Layer.defaultProps = {
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

export default Layer;
