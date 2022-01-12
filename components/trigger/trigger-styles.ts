import { css } from '@emotion/react';
import { ConfigContextOptions } from '../config-provider';
import { MergedTriggerProps } from './trigger';

export interface TriggerCSSProps extends MergedTriggerProps, ConfigContextOptions {}

export const layerStyles = (props: TriggerCSSProps) => {
  const { mode } = props.theme;
  const { radius } = props.theme.style;
  const { secondReverseBgColor, reverseTextColor } = props.theme[mode];

  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .${props.name}-layer-wrapper {
      position: absolute;
      z-index: 999;
    }
    .${props.name} {
      background-color: ${secondReverseBgColor};
      color: ${reverseTextColor};
      border-radius: ${radius}px;
    }
    .${props.name}__content {
      white-space: nowrap;
      word-wrap: break-word;
      padding: 4px 6px;
      width: max-content;
      font-size: 14px;
      min-width: 30px;
      min-height: 16px;
    }
    .${props.name}__arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 7px 6px 0;
      border-color: transparent ${secondReverseBgColor} transparent transparent;
      &--placement__topLeft {
        bottom: -8px;
        left: 9px;
        transform: translate(0, 0) rotate(-90deg);
      }
      &--placement__top {
        bottom: -8px;
        left: 50%;
        transform: translate(-50%, 0) rotate(-90deg);
      }
      &--placement__topRight {
        bottom: -8px;
        right: 9px;
        transform: translate(0, 0) rotate(-90deg);
      }
      &--placement__rightTop {
        top: 9px;
        left: -6px;
        transform: translate(0, 0) rotate(0deg);
      }
      &--placement__right {
        top: 50%;
        left: -6px;
        transform: translate(0, -50%) rotate(0deg);
      }
      &--placement__rightBottom {
        bottom: 9px;
        left: -6px;
        transform: translate(0, 0) rotate(0deg);
      }
      &--placement__bottomRight {
        top: -8px;
        right: 9px;
        transform: translate(0, 0) rotate(90deg);
      }
      &--placement__bottom {
        top: -8px;
        left: 50%;
        transform: translate(-50%, 0) rotate(90deg);
      }
      &--placement__bottomLeft {
        top: -8px;
        left: 9px;
        transform: translate(0, 0) rotate(90deg);
      }
      &--placement__leftBottom {
        bottom: 9px;
        right: -6px;
        transform: translate(0, 0) rotate(180deg);
      }
      &--placement__left {
        top: 50%;
        right: -6px;
        transform: translate(0, -50%) rotate(180deg);
      }
      &--placement__leftTop {
        top: 9px;
        right: -6px;
        transform: translate(0, 0) rotate(180deg);
      }
    }
  `;
};
