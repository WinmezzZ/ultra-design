import { FC, useEffect, useRef } from 'react';
import Trigger, { TriggerProps } from '../trigger';
import { TriggerRef } from '../trigger/trigger';
import { useMergeProps } from '../utils/mergeProps';
import { dropdownStyles } from './dropdown-styles';

export interface DropdownProps extends TriggerProps {
  /**
   * @description.zh-CN dropdown 出现的方位
   * @description.en-US dropdown position
   * @default 'bottomLeft'
   */
  placement?: TriggerProps['placement'];
  /**
   * @description.zh-CN 在提示显示前的延迟
   * @description.en-US delay before dropdown is shown
   * @default 50
   */
  showDelay?: number;
  /**
   * @description.zh-CN 关闭提示前的延迟
   * @description.en-US delay before dropdown is hidden (only work in 'hover' mode)
   * @default 50
   */
  hideDelay?: number;
  /**
   * @description.zh-CN 是否显示箭头
   * @description.en-US show arrow icon
   * @default false
   */
  showArrow?: boolean;
  /**
   * @description.zh-CN 渐变的持续的时间，尽量和 css 中的保持一致，此值将提供给 `CSSTransition`
   * @description.en-US timeout of `CSSTransition`, be best set to same as transition duration in css
   * @default 150
   */
  transitionTimeout?: number;
}

export type MergedDropdownProps = typeof defaultProps & DropdownProps;

const defaultProps = {
  name: 'ultra-dropdown',
  trigger: 'hover',
  transitionClassName: 'ultra-dropdown-layer-slide',
  showArrow: false,
  transitionTimeout: 150,
  showDelay: 50,
  hideDelay: 50,
  placement: 'bottomLeft',
};

const Dropdown: FC<DropdownProps> = p => {
  const props = useMergeProps(defaultProps, p);
  const triggerRef = useRef<TriggerRef>(null);

  const hideDropdown = () => {
    triggerRef.current?.changeVisible(false);
  };

  const onVisibleChange = (visible: boolean) => {
    if (!visible) return;
    const layer = triggerRef.current?.layerElement;

    if (!layer) return;
    layer.querySelectorAll<HTMLDivElement>('.ultra-dropdown-item').forEach(item => {
      item.addEventListener('click', hideDropdown);
    });
  };

  useEffect(() => {
    return () => {
      const layer = triggerRef.current?.layerElement;
      const dropdownItems = layer?.querySelectorAll<HTMLDivElement>('.ultra-dropdown-item');

      dropdownItems?.forEach(item => {
        item.removeEventListener('click', hideDropdown);
      });
    };
  }, []);

  return <Trigger onVisibleChange={onVisibleChange} ref={triggerRef} {...props} css={dropdownStyles(props)} />;
};

Dropdown.displayName = 'UltraDropdown';

export default Dropdown;
