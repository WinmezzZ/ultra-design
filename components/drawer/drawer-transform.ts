import { css, SerializedStyles } from '@emotion/react';
import { Placement } from './drawer';

export default function getDrawerTransform(placement: Placement, prefixClassName: string) {
  const placementData: Record<Placement, SerializedStyles> = {
    top: css`
      top: 0;
      width: 100%;
      &.${prefixClassName}-enter {
        transform: translateY(-100%);
      }
      &.${prefixClassName}-enter-active {
        transform: translateY(0);
      }
      &.${prefixClassName}-exit {
        transform: translateY(0);
      }
      &.${prefixClassName}-exit-active {
        transform: translateY(-100%);
      }
    `,
    left: css`
      left: 0;
      height: 100%;
      &.${prefixClassName}-enter {
        transform: translateX(-100%);
      }
      &.${prefixClassName}-enter-active {
        transform: translateX(0);
      }
      &.${prefixClassName}-exit {
        transform: translateX(0);
      }
      &.${prefixClassName}-exit-active {
        transform: translateX(-100%);
      }
    `,
    bottom: css`
      bottom: 0;
      width: 100%;
      &.${prefixClassName}-enter {
        transform: translateY(100%);
      }
      &.${prefixClassName}-enter-active {
        transform: translateY(0);
      }
      &.${prefixClassName}-exit {
        transform: translateY(0);
      }
      &.${prefixClassName}-exit-active {
        transform: translateY(100%);
      }
    `,
    right: css`
      height: 100%;
      right: 0;
      &.${prefixClassName}-enter {
        transform: translateX(100%);
      }
      &.${prefixClassName}-enter-active {
        transform: translateX(0);
      }
      &.${prefixClassName}-exit {
        transform: translateX(0);
      }
      &.${prefixClassName}-exit-active {
        transform: translateX(100%);
      }
    `,
  };

  return placementData[placement];
}
