import { css, Global } from '@emotion/react';
import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { overlayStyle } from './overlay-style';

export interface OverlayProps {
  visible: boolean;
  timeout?: number;
}

const Overlay: FC<OverlayProps> = props => {
  const { visible, timeout } = props;

  return (
    <React.Fragment css={overlayStyle(props)}>
      <CSSTransition in={visible} unmountOnExit timeout={timeout!} classNames="ultra-overlay">
        <div className="ultra-overlay">
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
    </React.Fragment>
  );
};

Overlay.defaultProps = {
  timeout: 300,
};

export default Overlay;
