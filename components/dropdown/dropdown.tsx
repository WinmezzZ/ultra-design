import React, { FC } from 'react';
import Tooltip, { TooltipProps } from '../tooltip';
import { dropdownStyles } from './dropdown-styles';

export interface DropdownProps extends Omit<TooltipProps, 'title' | 'placement'> {
  /**
   * @description.zh-CN 气泡卡片内容
   * @description.en-US dropdown content
   */
  content?: React.ReactNode;
  /**
   * @description.zh-CN 触发气泡卡片的方式
   * @description.en-US dropdown trigger mode
   * @default 'click'
   */
  trigger?: 'hover' | 'click';
}

const Dropdown: FC<DropdownProps> = props => {
  const { content, ...rest } = props;

  return (
    <Tooltip
      id="dropdown"
      cssProps={styleProps => dropdownStyles!(styleProps)}
      {...rest}
      title={content}
      showArrow={false}
      placement="bottomLeft"
      transitionClassName="ultra-dropdown-animate-slide"
    />
  );
};

Dropdown.defaultProps = {
  trigger: 'click',
};

Dropdown.displayName = 'UltraDropdown';

export default Dropdown;
