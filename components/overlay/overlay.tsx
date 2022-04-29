import { css, Global } from '@emotion/react';
import clsx from 'clsx';
import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import withStyle from '../utils/withStyle';
import { overlayStyle } from './overlay-style';

export interface OverlayProps {
  visible: boolean;
  timeout?: number;
}

const Overlay: FC<OverlayProps & React.HTMLAttributes<any>> = props => {
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

Overlay.defaultProps = {
  timeout: 300,
};

export default withStyle(Overlay);
