import clsx from 'clsx';
import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Lazy from '../lazy';
import { useMergeProps } from '../utils/mergeProps';
import uuid from '../utils/uuid';
import withStyle from '../utils/withStyle';
import { TabsItemProps } from './tabs-item';
import { tabsStyles } from './tabs-styles';

const transitionStyles = {
  entering: {
    opacity: 1,
    transition: `transform 0ms, opacity 150ms, width 0ms`,
  },
  entered: {
    opacity: 1,
    transition: `transform 150ms 0ms, opacity 150ms 0ms, width 150ms`,
  },
  exiting: {
    opacity: 0,
    transition: `transform 0ms, opacity 150ms, width 0ms`,
  },
  exited: { opacity: 0 },
  unmounted: {},
};

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
   * @description.zh-CN 是否懒加载
   * @description.en-US is lazy to load
   */
  lazy?: boolean;
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
  const { value, defaultValue, onChange, children, className, lazy, ...rest } = props;
  const [selfValue, setSelfValue] = useState(defaultValue);
  const tabItems = useMemo(
    () => React.Children.toArray(children).filter((c: any) => c.type.displayName === 'UltraTabsItem'),
    [children],
  );
  const [currentIndex, setCurrentIndex] = useState(() => {
    const i = tabItems.findIndex((item: any) => item.props.value === value);

    if (i >= 0) return i;

    return 0;
  });
  const [buttonRefs, setButtonRefs] = useState<Array<HTMLDivElement | null>>([]);
  const selectedRect = buttonRefs[currentIndex]?.getBoundingClientRect();
  const navRef = useRef<HTMLDivElement>(null);
  const navRect = navRef.current?.getBoundingClientRect();

  useEffect(() => {
    setButtonRefs(prev => {
      return prev.slice(0, tabItems.length);
    });
  }, [tabItems.length]);

  const navActiveStyle: CSSProperties =
    navRect && selectedRect
      ? {
          width: selectedRect.width * 0.8,
          transform: `translateX(calc(${selectedRect.left - navRect.left}px + 10%))`,
        }
      : {};

  useEffect(() => {
    if (typeof value === 'undefined') return;
    setSelfValue(value);
  }, [value]);

  const handleTabClick = (tab: TabsItemProps, index: number) => {
    if (tab.disabled) return;
    setCurrentIndex(index);
    setSelfValue(tab.value);
    onChange && onChange(tab.value);
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
      <div className="ultra-tabs-header" ref={navRef}>
        {tabList.map((tab, index) => (
          <div
            className={clsx(
              'ultra-tabs-header-item',
              tab.disabled && 'ultra-tabs-header-item__disabled',
              selfValue === tab.value && 'ultra-tabs-header-item__active',
            )}
            key={tab.value}
            onClick={() => handleTabClick(tab, index)}
            ref={el => el && (buttonRefs[index] = el)}
          >
            {tab.icon && <div className="ultra-tabs-header-item__icon">{tab.icon}</div>}
            {tab.label}
          </div>
        ))}
        <CSSTransition in={selectedRect != null} timeout={300}>
          {state => (
            <div
              className="ultra-tabs-header-sub"
              style={{
                ...navActiveStyle,
                ...transitionStyles[state],
              }}
            />
          )}
        </CSSTransition>
      </div>
      <div className="ultra-tabs-content">
        {tabItems.map((child: any) => {
          const item = (
            <CSSTransition
              classNames="ultra-tabs-item-transition"
              key={child.props.value || uuid()}
              in={selfValue === child.props.value}
              timeout={300}
            >
              {React.cloneElement(child, {
                className: `ultra-tabs-item__${selfValue === child.props.value ? 'active' : 'inactive'}`,
              })}
            </CSSTransition>
          );

          return lazy ? (
            <Lazy key={child.props.value || uuid()} visible={selfValue === child.props.value}>
              {item}
            </Lazy>
          ) : (
            item
          );
        })}
      </div>
    </div>
  );
};

Tabs.displayName = 'UltraTabs';

export default withStyle(Tabs);
