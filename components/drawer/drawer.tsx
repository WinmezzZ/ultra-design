import React, { FC, useEffect, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import Overlay from '../overlay';
import { drawerWrapperStyles } from './drawer-style';
import { Close } from '@icon-park/react';
import { useMergeProps } from '../utils/mergeProps';
import clsx from 'clsx';
import { usePortal } from 'winhooks';
import withStyle from '../utils/withStyle';
import getDrawerTransform from './drawer-transform';

export type Placement = 'top' | 'left' | 'bottom' | 'right';

export interface DrawerProps {
  /**
   * @description.zh-CN 抽屉标题
   * @description.en-US drawer's title
   */
  title?: React.ReactNode;
  /**
   * @description.zh-CN 是否显示
   * @description.en-US drawer's visible
   * @default false
   */
  visible: boolean;
  /**
   * @description.zh-CN 抽屉弹出位置
   * @description.en-US drawer position
   */
  placement?: Placement;
  /**
   * @description.zh-CN 抽屉关闭时会触发此方法，比如点击取消按钮、点击关闭图标、按下 esc 键的时候
   * @description.en-US trigger when drawer closed, like clicked cancel button, close icon and pressed escape key
   */
  onClose?: (e: React.MouseEvent | KeyboardEvent) => void;
  /**
   * @description.zh-CN 关闭前执行的方法，如果此方法返回 false，那么将会阻止抽屉关闭，支持异步。用途：比如关闭前确认
   * @description.en-US do something before drawer close, return `false` will stop close drawer, support sync function
   */
  beforeClose?: () => any | Promise<any>;
  /**
   * @description.zh-CN 抽屉的宽度，除了百分比，也可以设置为固定的 px
   * @description.en-US The width of the drawer, in addition to the percentage, can also be set to a fixed px
   * @default 200
   */
  width?: string | number;
  /**
   * @description.zh-CN 抽屉的高度，除了百分比，也可以设置为固定的 px
   * @description.en-US The height of the drawer, in addition to the percentage, can also be set to a fixed px
   * @default 200
   */
  height?: string | number;
  /**
   * @description.zh-CN 是否可以通过键盘的 esc 按键关闭抽屉
   * @description.en-US close drawer when press escape key on the keyboard
   * @default true
   */
  keyboard?: boolean;
  /**
   * @description.zh-CN 是否显示遮罩层
   * @description.en-US show overlay
   * @default true
   */
  overlay?: boolean;
  /**
   * @description.zh-CN 点击遮罩层关闭抽屉
   * @description.en-US close drawer on click the overlay
   * @default true
   */
  closeOnClickOverlay?: boolean;
  /**
   * @description.zh-CN 显示右上角关闭图标
   * @description.en-US display upper right close icon
   * @default true
   */
  showClose?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const defaultProps = {
  placement: 'right',
  keyboard: true,
  overlay: true,
  closeOnClickOverlay: true,
};

export type MergedDrawerrProps = typeof defaultProps & DrawerProps;

export const transitionClassNames = 'ultra-drawer-transition';

const Drawer: FC<DrawerProps> = p => {
  const props = useMergeProps(defaultProps, { ...p });

  const getWidthOrHeight = useMemo(() => {
    if (['top', 'bottom'].includes(props.placement)) {
      return { height: 200 };
    } else if (['left', 'right'].includes(props.placement)) {
      return { width: 200 };
    }

    return { width: 200 };
  }, [p.placement]);

  const {
    placement,
    title,
    visible,
    onClose,
    keyboard,
    overlay,
    closeOnClickOverlay,
    beforeClose,
    showClose,
    children,
  } = props;
  const { Portal } = usePortal({ id: 'ultra-drawer' });

  const transition = useMemo(() => getDrawerTransform(placement, transitionClassNames), [placement]);

  const closeHandler = async (e: KeyboardEvent | React.MouseEvent) => {
    if (beforeClose) {
      const cancelClose = (await beforeClose()) === false;
      // quite close when beforeClose return false

      if (cancelClose) return;
    }
    onClose?.(e);
  };

  const onClickOverlay = (e: React.MouseEvent<any>) => {
    closeOnClickOverlay && closeHandler(e);
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
    <Portal>
      {overlay && <Overlay visible={visible} timeout={300} onClick={onClickOverlay} />}
      <div
        css={drawerWrapperStyles(props)}
        className={clsx('ultra-drawer-wrapper', `ultra-drawer-wrapper--${placement}`, props.className)}
      >
        <CSSTransition in={visible} unmountOnExit timeout={300} classNames={transitionClassNames}>
          <div className="ultra-drawer" css={transition} style={getWidthOrHeight}>
            <div className="ultra-drawer-header">
              {showClose && <Close className="ultra-drawer-header__close" onClick={closeHandler} />}
              {title && <h4 className="ultra-drawer-header__title">{title}</h4>}
            </div>
            <div className="ultra-drawer-body">{children}</div>
          </div>
        </CSSTransition>
      </div>
    </Portal>
  );
};

Drawer.displayName = 'UltraDrawer';

export default withStyle(Drawer);
