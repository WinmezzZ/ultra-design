import React, { FC, MutableRefObject } from 'react';
import clsx from 'clsx';
import { layerStyles } from './trigger-styles';
import { CSSTransition } from 'react-transition-group';
import { MergedTriggerProps } from './trigger';
import { useConfigContext } from '../config-provider/useConfigContext';
import Portal from '../utils/Portal';
import { mergeProps } from '../utils/mergeProps';

interface LayerProps extends MergedTriggerProps {
  childRef: MutableRefObject<HTMLElement | null> | undefined;
  style: React.CSSProperties;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
}

const Layer: FC<LayerProps> = props => {
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
  } = props;

  const configContext = useConfigContext();
  const styleProps = mergeProps(configContext, props);

  if (!childRef?.current) return null;

  return (
    <Portal id={name} getContainer={() => getLayerContainer?.(childRef.current!)}>
      <div css={[layerStyles(styleProps)]}>
        <div>
          <div
            className={clsx(`${name}-layer-wrapper`, layerClassName)}
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <CSSTransition in={visible} unmountOnExit timeout={transitionTimeout!} classNames={transitionClassName}>
              <div className={`${name}`}>
                <div className={`${name}__content`}>{content}</div>
                {showArrow && <div className={clsx(`${name}__arrow`, `${name}__arrow--placement__${placement}`)} />}
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Layer;
