import React, { FC, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Info, Success, Error } from '@icon-park/react';
import ToastInternal, { ToastProps } from './toast-internal';
import { ConfigContext, PartialProviderConfig } from '../config-provider/config-provider';
import { mergeProps } from '../utils/mergeProps';
import { emitter } from '../utils/mitt';

let newConfig: PartialProviderConfig = {};

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

  const options: any = {};

  if (typeof data === 'string') {
    options.content = data;
    options.onClose = onClose;
    if (duration) {
      options.duration = duration;
    }
  } else {
    Object.assign(options, data);
  }

  interface ToastWrapperProps {
    options: ToastProps;
  }

  const ToastWrapper: FC<ToastWrapperProps> = props => {
    const { options } = props;
    const context = useContext(ConfigContext);
    const config = mergeProps(context, newConfig, options);

    const [toastOptions, setToastOptions] = useState(config);

    useEffect(() => {
      emitter.on('toast-config', e => {
        setToastOptions(o => mergeProps(o, e));
      });

      return () => {
        emitter.all.clear();
      };
    }, []);

    return <ToastInternal {...toastOptions} />;
  };

  ReactDOM.render(<ToastWrapper options={options} />, root);
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
  newConfig = config;
  emitter.emit('toast-config', config);
};

for (const key in iconMap) {
  const k = key as ToastType;

  Toast[k] = (content: React.ReactNode, duration?: number, onClose?: OnClose) => {
    toast({ content, duration, onClose, icon: iconMap[k] });
  };
}

export default Toast;
