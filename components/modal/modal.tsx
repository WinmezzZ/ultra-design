import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Overlay from '../overlay';
import { modalWrapperStyle } from './modal-style';
import Button, { ButtonProps } from '../button';
import { Close } from '@icon-park/react';
import { useConfigContext } from '../config-provider/useConfigContext';

type ModalButtonProps = Pick<ButtonProps, 'disabled' | 'loading' | 'type' | 'children'>;

export interface ModalProps {
  /**
   * @description.zh-CN 对话框标题
   * @description.en-US modal's title
   */
  title?: string;
  /**
   * @description.zh-CN 是否显示
   * @description.en-US modal's visible
   * @default false
   */
  visible: boolean;
  /**
   * @description.zh-CN 对话框关闭时会触发此方法，比如点击取消按钮、点击关闭图标、按下 esc 键的时候
   * @description.en-US trigger when modal closed, like clicked cancel button, close icon and pressed escape key
   */
  onClose?: (e: React.MouseEvent | KeyboardEvent) => void;
  /**
   * @description.zh-CN 点击确定按钮时会触发此方法
   * @description.en-US trigger when clicked confirm button
   */
  onOk?: (e: React.MouseEvent) => void;
  /**
   * @description.zh-CN 关闭前执行的方法，如果此方法返回 false，那么将会阻止对话框关闭，支持异步。用途：比如关闭前确认
   * @description.en-US do something before modal close, return `false` will stop close modal, support sync function
   */
  beforeClose?: () => Promise<any>;
  /**
   * @description.zh-CN 对话框相对浏览器窗口的 top 属性
   * @description.en-US the top attribute of the modal relative to the browser window
   * @default '10vh'
   */
  top?: string | number;
  /**
   * @description.zh-CN 对话框的宽度，除了百分比，也可以设置为固定的 px
   * @description.en-US The width of the modal, in addition to the percentage, can also be set to a fixed px
   * @default '50%'
   */
  width?: string;
  /**
   * @description.zh-CN 对话框是否垂直居中
   * @description.en-US set modal vertical center
   * @default false
   */
  center?: boolean;
  /**
   * @description.zh-CN 是否可以通过键盘的 esc 按键关闭对话框
   * @description.en-US close modal when press escape key on the keyboard
   * @default true
   */
  keyboard?: boolean;
  /**
   * @description.zh-CN 隐藏右上角关闭图标
   * @description.en-US hide upper right close icon
   * @default false
   */
  hideClose?: boolean;
  /**
   * @description.zh-CN 确定按钮的属性，支持 'disabled', 'loading', 'type', 'children'，设置为 `null` 将隐藏确认按钮
   * @description.en-US confirm button props, support 'disabled', 'loading', 'type', 'children', set to `null` will hide confirm button
   * @default { children: 'Ok', type: 'primary' }
   */
  confirmButton?: ModalButtonProps | null;
  /**
   * @description.zh-CN 取消按钮的属性，支持 'disabled', 'loading', 'type', 'children'，设置为 `null` 将隐藏取消按钮
   * @description.en-US cancel button props, support 'disabled', 'loading', 'type', 'children', set to `null` will hide cancel button
   * @default { children: 'Cancel' }
   */
  cancelButton?: ModalButtonProps | null;
}

const Modal: FC<ModalProps> = props => {
  const { title, visible, onClose, onOk, confirmButton, cancelButton, keyboard, beforeClose, hideClose, children } =
    props;
  const configContext = useConfigContext();
  const cssProps = { ...configContext, ...props };
  const confirmButtonProps: ModalButtonProps = Object.assign({}, { type: 'primary', children: '确定' }, confirmButton);
  const cancelBtnProps: ModalButtonProps = Object.assign({}, { children: '取消' }, cancelButton);

  const closeHandler = async (e: KeyboardEvent | React.MouseEvent) => {
    if (beforeClose) {
      const cancelClose = (await beforeClose()) === false;
      // quite close when beforeClose return false

      if (cancelClose) return;
    }
    onClose?.(e);
  };

  useEffect(() => {
    if (!keyboard) return;
    const listenEscKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        closeHandler(e);
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
          <Overlay visible={visible} timeout={300} />
          <CSSTransition in={visible} unmountOnExit timeout={300} classNames="ultra-modal-wrapper">
            <div css={modalWrapperStyle(cssProps)} className="ultra-modal-wrapper">
              <div className="ultra-modal">
                <div className="ultra-modal-header">
                  {!hideClose && <Close className="ultra-modal-header__close" onClick={closeHandler} />}
                  {title && <h4 className="ultra-modal-header__title">{title}</h4>}
                </div>
                <div className="ultra-modal-body">{children}</div>
                {!(confirmButton === null && cancelButton === null) && (
                  <div className="ultra-modal-footer">
                    {confirmButton !== null && <Button {...confirmButtonProps} onClick={onOk} />}
                    {cancelButton !== null && <Button {...cancelBtnProps} onClick={closeHandler} />}
                  </div>
                )}
              </div>
            </div>
          </CSSTransition>
        </div>,
        document.body,
      )}
    </>
  );
};

Modal.defaultProps = {
  visible: false,
  keyboard: true,
  width: '50%',
};

export default Modal;
