import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Overlay from '../overlay';
import { modalWrapperStyle } from './modal-style';

export interface ModalProps {
  visible: boolean;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = props => {
  const { visible, onClose, children } = props;

  const closeHandler = () => {
    onClose?.();
  };

  useEffect(() => {
    const listenEscKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        closeHandler();
      }
    };

    window.addEventListener('keydown', listenEscKeyDown);

    return () => {
      window.removeEventListener('keydown', listenEscKeyDown);
    };
  }, []);

  return (
    <>
      {createPortal(
        <div>
          <Overlay visible={visible} timeout={1000} />
          <CSSTransition in={visible} unmountOnExit timeout={1000} classNames="ultra-modal-wrapper">
            <div css={modalWrapperStyle} onClick={closeHandler}>
              <div className="ultra-modal">{children}</div>
            </div>
          </CSSTransition>
        </div>,
        document.body,
      )}
    </>
  );
};

export default Modal;
