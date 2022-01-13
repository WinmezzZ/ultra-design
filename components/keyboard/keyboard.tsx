import React from 'react';
import { useMergeProps } from '../utils/mergeProps';
import { keyboardStyles } from './keyboard-styles';

interface Props {
  /**
   * @description.zh-CN show command key
   * @description.en-US 显示 Command 按钮
   */
  command?: boolean;
  /**
   * @description.zh-CN show shift key
   * @description.en-US 显示 Shift 按钮
   */
  shift?: boolean;
  /**
   * @description.zh-CN show option key
   * @description.en-US 显示 Option 按钮
   */
  option?: boolean;
  /**
   * @description.zh-CN show ctrl key
   * @description.en-US 显示 Control 按钮
   */
  ctrl?: boolean;
  className?: string;
}
type NativeAttrs = Omit<React.KeygenHTMLAttributes<any>, keyof Props>;

export type KeyboardProps = Props & NativeAttrs;

const defaultProps = {};

export type MergedKeyboardProps = typeof defaultProps & Props;

const Keyboard: React.FC<KeyboardProps> = p => {
  const props = useMergeProps(defaultProps, p);
  const { command, shift, option, ctrl, children, className, ...rest } = props;

  return (
    <kbd className={className} {...rest} css={keyboardStyles(props)}>
      {command && <span>⌘</span>}
      {shift && <span>⇧</span>}
      {option && <span>⌥</span>}
      {ctrl && <span>⌃</span>}
      {children && <span>{children}</span>}
    </kbd>
  );
};

Keyboard.displayName = 'UltraKeyboard';

export default Keyboard;
