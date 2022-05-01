import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';
import { TabsItemProps } from './tabs-item';
import { tabsStyles } from './tabs-styles';

interface Props {
  /**
   * @description.zh-CN 默认值
   * @description.en-US default value
   */
  defaultValue?: string;
  /**
   * @description.zh-CN 当前选中的值
   * @description.en-US current select value
   */
  value?: string;
  /**
   * @description.zh-CN 选项卡切换回调
   * @description.en-US change event
   */
  onChange?: (value: string) => void;
  className?: string;
}
type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof Props>;

export type TabsProps = Props & NativeAttrs;

const defaultProps = {};

export type MergedTabsProps = typeof defaultProps & Props;

const Tabs: React.FC<TabsProps> = p => {
  const props = useMergeProps(defaultProps, p);
  const { value, defaultValue, onChange, children, className, ...rest } = props;
  const [selfValue, setSelfValue] = useState(defaultValue);

  useEffect(() => {
    if (typeof value === 'undefined') return;
    setSelfValue(value);
  }, [value]);

  const clickHandler = (value: string) => {
    setSelfValue(value);
    onChange && onChange(value);
  };

  const tabList: TabsItemProps[] = useMemo(() => {
    return React.Children.toArray(children)
      .filter((c: any) => c.type.displayName === 'UltraTabsItem')
      .map((child: any) => {
        const { label, value, icon, disabled } = child.props;

        return { label, value, icon, disabled };
      });
  }, [children]);

  return (
    <div className={clsx('ultra-tabs', className)} {...rest} css={tabsStyles(props)}>
      <div className="ultra-tabs-header">
        {tabList.map(tab => (
          <div
            className={clsx(
              'ultra-tabs-header-item',
              tab.disabled && 'ultra-tabs-header-item__disabled',
              selfValue === tab.value && 'ultra-tabs-header-item__active',
            )}
            key={tab.value}
            onClick={() => clickHandler(tab.value)}
          >
            {tab.icon && <div className="ultra-tabs-header-item__icon">{tab.icon}</div>}
            {tab.label}
          </div>
        ))}
      </div>
      <div className="ultra-tabs-content">
        {React.Children.toArray(children)
          .filter((c: any) => c.type.displayName === 'UltraTabsItem')
          .map((child: any) => {
            return (
              <CSSTransition
                classNames="ultra-tabs-item-transition"
                key={child.props.value}
                in={selfValue === child.props.value}
                timeout={300}
                unmountOnExit
              >
                {React.cloneElement(child, {
                  className: `ultra-tabs-item__${selfValue === child.props.value ? 'active' : 'inactive'}`,
                })}
              </CSSTransition>
            );
          })}
      </div>
    </div>
  );
};

Tabs.displayName = 'UltraTabs';

export default withStyle(Tabs);
