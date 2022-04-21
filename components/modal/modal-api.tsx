import React, { FC, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Info } from '@icon-park/react';
import ConfirmModal, { ConfirmModalProps } from './modal-confirm';
import ModalComponent from './modal';
import { ConfigContext, PartialProviderConfig } from '../config-provider/config-provider';
import { mergeProps } from '../utils/mergeProps';
import { emitter } from '../utils/mitt';

interface ConfirmOptions extends Pick<ConfirmModalProps, 'confirmButton' | 'cancelButton'> {
  /**
   * @description.zh-CN 确认框标题
   * @description.en-US confirm modal title
   */
  title?: React.ReactNode;
  /**
   * @description.zh-CN 确认框内容
   * @description.en-US confirm modal content
   */
  content: React.ReactNode;
  /**
   * @description.zh-CN 对话框关闭时会触发此方法，比如点击取消按钮、点击关闭图标、按下 esc 键的时候
   * @description.en-US trigger when modal closed, like clicked cancel button, close icon and pressed escape key
   */
  onClose?: (e: React.MouseEvent | KeyboardEvent) => void | boolean | Promise<void | boolean>;
  /**
   * @description.zh-CN 点击确定按钮时会触发此方法
   * @description.en-US trigger when clicked confirm button
   */
  onOk?: (e: React.MouseEvent) => void | boolean | Promise<void | boolean>;
}
let newConfig: PartialProviderConfig = {};

const unmountRoot = () => {
  const root = document.getElementById('ultra-confirm');

  if (root) {
    ReactDOM.unmountComponentAtNode(root);

    return root;
  }
};

const createRoot = () => {
  const root = document.createElement('div');

  root.id = 'ultra-confirm';
  document.body.appendChild(root);

  return root;
};

function confirm(data: ConfirmOptions) {
  const root = unmountRoot() || createRoot();

  const options: any = {};

  Object.assign(options, data);
  interface ConfirmModalWrapperProps {
    options: ConfirmOptions;
  }

  const ConfirmModalWrapper: FC<ConfirmModalWrapperProps> = props => {
    const { options } = props;
    const context = useContext(ConfigContext);
    const config = mergeProps(context, newConfig, options);
    const [visible, setVisible] = useState(true);

    const [confirmOptions, setConfirmModalOptions] = useState(config);

    const data: ConfirmModalProps = {
      visible: visible,
      title: (
        <>
          <Info theme="outline" size="18" fill="#13c2c2" /> {confirmOptions.title}
        </>
      ),
      onOk: async e => {
        const result = await confirmOptions.onOk?.(e);

        if (result === false) return;

        setVisible(false);
      },
      onClose: async e => {
        const result = await confirmOptions.onClose?.(e);

        if (result === false) return;
        setVisible(false);
      },
      children: confirmOptions.content,
      cancelButton: confirmOptions.cancelButton,
      confirmButton: confirmOptions.confirmButton,
    };

    useEffect(() => {
      emitter.on('modal-config', e => {
        setConfirmModalOptions(o => mergeProps(o, e));
      });

      return () => {
        emitter.all.clear();
      };
    }, []);

    return <ConfirmModal {...confirmOptions} {...data} />;
  };

  ReactDOM.render(<ConfirmModalWrapper options={options} />, root);
}

type ConfirmModalType = 'confirm';

type ConfirmModalIconMap = Record<ConfirmModalType, React.ReactNode>;

const iconMap: ConfirmModalIconMap = {
  confirm: <Info theme="outline" size="18" fill="#13c2c2" />,
};

type ModalInstance = typeof ModalComponent & {
  config: (config: PartialProviderConfig) => void;
  confirm: (options: ConfirmOptions) => void;
};
const Modal = ModalComponent as ModalInstance;

Modal.config = (config: PartialProviderConfig) => {
  newConfig = config;
  emitter.emit('modal-config', config);
};

for (const key in iconMap) {
  const k = key as ConfirmModalType;

  Modal[k] = (options: ConfirmOptions) => {
    confirm(options);
  };
}

export default Modal;
