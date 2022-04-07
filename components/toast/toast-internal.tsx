import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { toastWrapperStyles } from './toast-style';
import { useMergeProps } from '../utils/mergeProps';
import { Close } from '@icon-park/react';

export interface ToastProps {
  /**
   *
   * @description.zh-CN toast 内容
   * @description.en-US toast content
   */
  content?: React.ReactNode;
  /**
   * @description.zh-CN 自动关闭时长，默认 2000 ms
   * @description.en-US leave duration, default 2000 ms
   * @default '2000'
   */
  duration?: number;
  /**
   * @description.zh-CN 关闭时触发的回调函数
   * @description.en-US will be triggered when the toast is closed
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

  const { onClose, hideClose, duration, icon, content, children } = props;
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
      onClose?.();
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
          {children || content}
          {!hideClose && <Close className="ultra-toast__close" onClick={closehandler} />}
        </div>
      </div>
    </CSSTransition>
  );
};

ToastInternal.displayName = 'UltraToast';

export default ToastInternal;
