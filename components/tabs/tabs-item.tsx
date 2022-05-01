import clsx from 'clsx';
import React from 'react';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';
import { tabsItemStyles } from './tabs-styles';

export interface TabsItemProps {
  /**
   * @description.zh-CN 选项卡标签文字
   * @description.en-US tabs label
   */
  label: React.ReactNode;
  /**
   * @description.zh-CN 唯一值
   * @description.en-US unique value
   */
  value: string;
  /**
   * @description.zh-CN icon 图标
   * @description.en-US tabs icon
   */
  icon?: React.ReactNode;
  /**
   * @description.zh-CN 禁用当前 tab
   * @description.en-US disable current tab
   */
  disabled?: boolean;
  className?: string;
}

const defaultProps = {};

export type MergedTabsItemProps = typeof defaultProps & TabsItemProps;

const TabsItem: React.FC<TabsItemProps> = p => {
  const props = useMergeProps(defaultProps, p);
  const { theme: _t, locale: _l, label: _, value: __, children, icon: _icon, className, ...rest } = props;

  return (
    <div className={clsx('ultra-tabs-item', className)} {...rest} css={tabsItemStyles(props)}>
      {children}
    </div>
  );
};

TabsItem.displayName = 'UltraTabsItem';

export default withStyle(TabsItem);
