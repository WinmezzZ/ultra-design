import React, { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Close, Info, Success, Error } from '@icon-park/react';
import { CSSTransition } from 'react-transition-group';
import { toastWrapperStyles } from './toast-style';
import { useMergeProps } from '../utils/mergeProps';

export interface ToastProps {
  /**
   *
   * @description.zh-CN toast 内容
   * @description.en-US toast content
   */
  content?: React.ReactNode;
  /**
   * @description.zh-CN 消失时长，默认 2000 ms
   * @description.en-US leave duration, default 2000 ms
   * @default '2000'
   */
  duration?: number;
  /**
   * @description.zh-CN 手动关闭时会触发此方法
   * @description.en-US trigger when toast closing button clicked
   */
  onClose?: () => void;
  /**
   * @description.zh-CN toast 相对浏览器窗口的 top 属性
   * @description.en-US the top attribute of the toast relative to the browser window
   * @default '20px'
   */
  top?: string;

  /**
   * @description.zh-CN 隐藏手动关闭按钮
   * @description.en-US hide close icon
   * @default false
   */
  hideClose?: boolean;
  /**
   * @description.zh-CN 自定义左侧 icon 图标
   * @description.en-US custom left icon
   */
  icon?: React.ReactNode;
}

const defaultProps = {
  duration: 2000,
};

export type MergedToastrProps = typeof defaultProps & ToastProps;

export const ToastInternal: FC<ToastProps> = p => {
  const [visible, setVisible] = useState(false);
  const props = useMergeProps(defaultProps, p);
  const { onClose, hideClose, duration, icon, children } = props;
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setVisible(true);

    // clearTimeout when component unmounted
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (!duration) return;

    timer.current = setTimeout(() => {
      setVisible(false);
    }, duration);
  }, [visible]);

  const closehandler = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <CSSTransition in={visible} unmountOnExit timeout={300} classNames="ultra-toast-wrapper">
      <div css={toastWrapperStyles(props)} className="ultra-toast-wrapper">
        <div className="ultra-toast">
          {icon && <span className="ultra-toast__icon">{icon}</span>}
          {children}
          {!hideClose && <Close className="ultra-toast__close" onClick={closehandler} />}
        </div>
      </div>
    </CSSTransition>
  );
};

ToastInternal.displayName = 'UltraToast';

const unmountRoot = () => {
  const root = document.getElementById('ultra-toast');

  if (root) {
    ReactDOM.unmountComponentAtNode(root);

    return root;
  }
};

function open(content: string): void;
function open(props: ToastProps): void;
function open(data: any) {
  let root = unmountRoot();

  if (!root) {
    root = document.createElement('div');
    root.id = 'ultra-toast';
    document.body.appendChild(root);
  }

  const config: any = {};

  if (typeof data === 'string') {
    config.content = data;
  } else {
    Object.assign(config, data);
  }

  ReactDOM.render(<ToastInternal {...config}>{config.content} </ToastInternal>, root);
}

type ToastType = 'info' | 'success' | 'warning' | 'error';

type ToastIconMap = Record<ToastType, React.ReactNode>;

const iconMap: ToastIconMap = {
  info: <Info theme="outline" size="18" fill="#13c2c2" />,
  success: <Success theme="outline" size="18" fill="#00B42A" />,
  warning: <Info theme="outline" size="18" fill="#FF7D00" />,
  error: <Error theme="outline" size="12" fill="#F53F3F" />,
};

type OnClose = () => void;

type ToastInstance = typeof open & {
  info: (content: React.ReactNode, duration?: number, onClose?: OnClose) => void;
  success: (content: React.ReactNode, duration?: number, onClose?: OnClose) => void;
  warning: (content: React.ReactNode, duration?: number, onClose?: OnClose) => void;
  error: (content: React.ReactNode, duration?: number, onClose?: OnClose) => void;
  destory: () => void;
};

const Toast = open as ToastInstance;

for (const key in iconMap) {
  const k = key as ToastType;

  Toast[k] = (content: React.ReactNode, duration?: number, onClose?: OnClose) => {
    open({
      content,
      duration,
      onClose,
      icon: iconMap[k],
    });
  };
}

export default Toast;
