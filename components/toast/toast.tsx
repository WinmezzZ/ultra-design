import React from 'react';
import ReactDOM from 'react-dom';
import { Info, Success, Error } from '@icon-park/react';
import ToastInternal, { ToastProps } from './toast-internal';
import { PartialProviderConfig } from '../config-provider/config-provider';
import { mergeProps } from '../utils/mergeProps';

let taostConfig: any = {};

const unmountRoot = () => {
  const root = document.getElementById('ultra-toast');

  if (root) {
    ReactDOM.unmountComponentAtNode(root);

    return root;
  }
};

const createRoot = () => {
  const root = document.createElement('div');

  root.id = 'ultra-toast';
  document.body.appendChild(root);

  return root;
};

type OnClose = () => void;
function toast(content: string, duration?: number, onClose?: OnClose): void;

function toast(props: ToastProps): void;
function toast(data: string | ToastProps, duration?: number, onClose?: OnClose) {
  const root = unmountRoot() || createRoot();

  const config: any = {};

  if (typeof data === 'string') {
    config.content = data;
    config.onClose = onClose;
    if (duration) {
      config.duration = duration;
    }
  } else {
    Object.assign(config, data);
  }

  console.dir(toast);

  ReactDOM.render(<ToastInternal {...mergeProps(taostConfig, config)} />, root);
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
  config: (config: PartialProviderConfig) => void;
};

/**
 * toast mesaage component
 */
const Toast = toast as ToastInstance;

Toast.clear = unmountRoot;

Toast.config = (config: PartialProviderConfig) => {
  taostConfig = config;
};

for (const key in iconMap) {
  const k = key as ToastType;

  Toast[k] = (content: React.ReactNode, duration?: number, onClose?: OnClose) => {
    toast({ content, duration, onClose, icon: iconMap[k] });
  };
}

export default Toast;
