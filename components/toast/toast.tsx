import React from 'react';
import ReactDOM from 'react-dom';
import { Info, Success, Error } from '@icon-park/react';
import ToastInternal, { ToastProps } from './toast-internal';

const unmountRoot = () => {
  const root = document.getElementById('ultra-toast');

  if (root) {
    ReactDOM.unmountComponentAtNode(root);

    return root;
  }
};

type OnClose = () => void;
function toast(content: string, duration?: number, onClose?: OnClose): void;

function toast(props: ToastProps): void;
function toast(data: string | ToastProps, duration?: number, onClose?: OnClose) {
  let root = unmountRoot();

  if (!root) {
    root = document.createElement('div');
    root.id = 'ultra-toast';
    document.body.appendChild(root);
  }

  const config: any = {};

  if (typeof data === 'string') {
    config.content = data;
    duration && (config.duration = duration);
    onClose && (config.onClose = onClose);
    config.content = data;
  } else {
    Object.assign(config, data);
  }

  ReactDOM.render(<ToastInternal {...config} />, root);
}

type ToastType = 'info' | 'success' | 'warning' | 'error';

type ToastIconMap = Record<ToastType, React.ReactNode>;

const iconMap: ToastIconMap = {
  info: <Info theme="outline" size="18" fill="#13c2c2" />,
  success: <Success theme="outline" size="18" fill="#00B42A" />,
  warning: <Info theme="outline" size="18" fill="#FF7D00" />,
  error: <Error theme="outline" size="18" fill="#F53F3F" />,
};

type ToastInstance = typeof toast & {
  info: (content: React.ReactNode, duration?: number, onClose?: OnClose) => void;
  success: (content: React.ReactNode, duration?: number, onClose?: OnClose) => void;
  warning: (content: React.ReactNode, duration?: number, onClose?: OnClose) => void;
  error: (content: React.ReactNode, duration?: number, onClose?: OnClose) => void;
  clear: () => void;
};

/**
 * toast mesaage component
 */
const Toast = toast as ToastInstance;

Toast.clear = unmountRoot;

for (const key in iconMap) {
  const k = key as ToastType;

  Toast[k] = (content: React.ReactNode, duration?: number, onClose?: OnClose) => {
    toast({
      content,
      duration,
      onClose,
      icon: iconMap[k],
    });
  };
}

export default Toast;
