import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { loadingWrapperStyles } from './loading-style';
import { useMergeProps } from '../utils/mergeProps';
import { LoadingFour } from '@icon-park/react';
import withStyle from '../utils/withStyle';

export interface LoadingProps {
  /**
   *
   * @description.zh-CN loading 提示文字
   * @description.en-US loading tip text
   */
  message?: React.ReactNode;
  /**
   *
   * @description.zh-CN 是否显示遮罩，传入字符串可自定义遮罩背景色
   * @description.en-US show mask, pass string type of value for custom mask background-color
   */
  mask?: boolean | string;
  /**
   * @description.zh-CN 是否填充整个父元素
   * @description.en-US fill full parent
   */
  fill?: boolean;
  /**
   * @description.zh-CN 是否全屏显示
   * @description.en-US need fullscrenn
   */
  fullScreen?: boolean;
  /**
   * @description.zh-CN 自定义 loading 图标
   * @description.en-US custom loading icon
   */
  icon?: React.ReactNode;
}

type LoadingNativeProps = LoadingProps & React.HTMLAttributes<any>;

export const defaultProps = {
  icon: <LoadingFour theme="outline" size="24" />,
};

export type MergedLoadingrProps = typeof defaultProps & LoadingProps;

const LoadingInternal: FC<LoadingNativeProps> = p => {
  const [visible, setVisible] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);
  const props = useMergeProps(defaultProps, p);

  const { icon, message, mask, fill, fullScreen, children, ...rest } = props;

  useEffect(() => {
    setVisible(true);
  }, []);

  const onEnter = () => {
    if (!fill) return;
    const parent = loadingRef.current?.parentElement;

    if (parent && !fullScreen) {
      parent.style.position = 'relative';
    }
  };

  return (
    <CSSTransition in={visible} unmountOnExit timeout={300} onEnter={onEnter}>
      <div ref={loadingRef} css={loadingWrapperStyles(props)} className="ultra-loading-wrapper" {...rest}>
        {(mask || fullScreen) && <div className="ultra-mask"></div>}
        <div className="ultra-loading">
          {icon && <span className="ultra-loading__icon">{icon}</span>}
          {children || message}
        </div>
      </div>
    </CSSTransition>
  );
};

LoadingInternal.displayName = 'UltraLoading';

export default withStyle(LoadingInternal);
