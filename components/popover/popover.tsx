import React, { FC } from 'react';
import { Tooltip, TooltipProps } from '..';
import { popoverStyles } from './popover-styles';

export interface PopoverProps extends Omit<TooltipProps, 'title'> {
  /**
   * @description.zh-CN 气泡卡片内容
   * @description.en-US popover content
   */
  content?: React.ReactNode;
  /**
   * @description.zh-CN 触发气泡卡片的方式
   * @description.en-US popover trigger mode
   * @default 'click'
   */
  trigger?: 'hover' | 'click';
}

const Popover: FC<PopoverProps> = props => {
  const { content, ...rest } = props;

  return <Tooltip cssProps={styleProps => popoverStyles!(styleProps)} {...rest} title={content} />;
};

Popover.defaultProps = {
  trigger: 'click',
};

export default Popover;
