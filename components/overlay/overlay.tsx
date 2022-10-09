import { css, Global } from '@emotion/react';
import clsx from 'clsx';
import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import withStyle from '../utils/withStyle';
import { overlayStyle } from './overlay-style';

export interface Props {
  visible: boolean;
  timeout?: number;
}

type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof Props>;

export type OverlayProps = Props & NativeAttrs;

const OverlayComponent: FC<OverlayProps> = props => {
  const { visible, timeout, className, ...rest } = props;

  return (
    <>
      <CSSTransition in={visible} unmountOnExit timeout={timeout!} classNames="ultra-overlay">
        <div css={overlayStyle(props)} className={clsx('ultra-overlay', className)} {...rest}>
          {visible && (
            <Global
              styles={css`
                body {
                  width: 100vw;
                  height: 100vh;
                  overflow: hidden;
                }
              `}
            ></Global>
          )}
        </div>
      </CSSTransition>
    </>
  );
};

OverlayComponent.defaultProps = {
  timeout: 300,
};

const Overlay = withStyle(OverlayComponent);

export default Overlay;
