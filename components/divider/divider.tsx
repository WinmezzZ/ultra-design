import { dividerStyles } from './divider-styles';
import React from 'react';
import { useMergeProps } from '../utils/mergeProps';
import clsx from 'clsx';
import withStyle from '../utils/withStyle';

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
    <div css={dividerStyles(props)} className={clsx('ultra-divider', vertical && 'ultra-divider--vertical')}>
      {props.children && !vertical && <span className="ultra-divider__text">{props.children}</span>}
    </div>
  );
};

Divider.displayName = 'UltraDivider';

export default withStyle(Divider);
