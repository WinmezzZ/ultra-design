import { ReactiveDomReact } from '../utils/getRect';
import React from 'react';

export type Placement =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'leftBottom'
  | 'left'
  | 'leftTop';

export const defaultTooltipPosition = {
  top: '-1000px',
  left: '-1000px',
  transform: 'none',
};

export interface TooltipPosition {
  top: string;
  left: string;
  transform: string;
}

export const getPosition = (placement: Placement, rect: DOMRect, offset: number) => {
  const placementPositions: Record<Placement, React.CSSProperties> = {
    topLeft: {
      top: `${rect.top - offset}px`,
      left: `${rect.left}px`,
      transform: 'translate(0, -100%)',
    },
    top: {
      top: `${rect.top - offset}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translate(-50%, -100%)',
    },
    topRight: {
      top: `${rect.top - offset}px`,
      left: `${rect.left + rect.width}px`,
      transform: 'translate(-100%, -100%)',
    },
    rightTop: {
      top: `${rect.top}px`,
      left: `${rect.left + rect.width + offset}px`,
      transform: 'translate(0, 0)',
    },
    right: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.left + rect.width + offset}px`,
      transform: 'translate(0, -50%)',
    },
    rightBottom: {
      top: `${rect.top + rect.height}px`,
      left: `${rect.left + rect.width + offset}px`,
      transform: 'translate(0, -100%)',
    },
    bottomRight: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left + rect.width}px`,
      transform: 'translate(-100%, 0)',
    },
    bottom: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translate(-50%, 0)',
    },
    bottomLeft: {
      top: `${rect.bottom + offset}px`,
      left: `${rect.left}px`,
      transform: 'translate(0, 0)',
    },
    leftBottom: {
      top: `${rect.top + rect.height}px`,
      left: `${rect.left - offset}px`,
      transform: 'translate(-100%, -100%)',
    },
    left: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.left - offset}px`,
      transform: 'translate(-100%, -50%)',
    },
    leftTop: {
      top: `${rect.top}px`,
      left: `${rect.left - offset}px`,
      transform: 'translate(-100%, 0)',
    },
  };

  return placementPositions[placement];
};

export const getIconPosition = (placement: Placement) => {
  const placementPositions: Record<Placement, React.CSSProperties> = {
    topLeft: {
      bottom: `-8px`,
      left: `12px`,
      transform: 'translate(0, 0) rotate(-90deg)',
    },
    top: {
      bottom: `-8px`,
      left: `50%`,
      transform: 'translate(-50%, 0) rotate(-90deg)',
    },
    topRight: {
      bottom: `-8px`,
      right: `12px`,
      transform: 'translate(0, 0) rotate(-90deg)',
    },
    rightTop: {
      top: `12px`,
      left: `-6px`,
      transform: 'translate(0, 0) rotate(0deg)',
    },
    right: {
      top: `50%`,
      left: `-6px`,
      transform: 'translate(0, -50%) rotate(0deg)',
    },
    rightBottom: {
      bottom: `12px`,
      left: `-6px`,
      transform: 'translate(0, 0) rotate(0deg)',
    },
    bottomRight: {
      top: `-8px`,
      right: `12px`,
      transform: 'translate(0, 0) rotate(90deg)',
    },
    bottom: {
      top: `-8px`,
      left: `50%`,
      transform: 'translate(-50%, 0) rotate(90deg)',
    },
    bottomLeft: {
      top: `-8px`,
      left: `12px`,
      transform: 'translate(0, 0) rotate(90deg)',
    },
    leftBottom: {
      bottom: `12px`,
      right: `-6px`,
      transform: 'translate(0, 0) rotate(180deg)',
    },
    left: {
      top: `50%`,
      right: `-6px`,
      transform: 'translate(0, -50%) rotate(180deg)',
    },
    leftTop: {
      top: `12px`,
      right: `-6px`,
      transform: 'translate(0, -50%) rotate(180deg)',
    },
  };

  return placementPositions[placement];
};
