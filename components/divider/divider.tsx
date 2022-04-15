import { dividerStyles } from './divider-styles';
import React from 'react';
import { useMergeProps } from '../utils/mergeProps';

export type DividerType = 'primary' | 'dashed' | 'text' | 'default';

export interface DividerProps {
  /**
   * @description.zh-CN 垂直展示分割线
   * @description.en-US vertical display
   */
  vertical?: boolean;
  className?: string;
}

const defaultProps = {};

export type MergedDividerProps = typeof defaultProps & DividerProps;

const Divider: React.FC<DividerProps> = p => {
  const props = useMergeProps(defaultProps, p);

  const { vertical } = props;

  return (
    <div css={dividerStyles(props)} className="ultra-divider">
      {props.children && !vertical && <span className="ultra-divider__text">{props.children}</span>}
    </div>
  );
};

Divider.displayName = 'UltraDivider';

export default Divider;
