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

export const getPosition = (placement: Placement, rect: DOMRect) => {
  const placementPositions: Record<Placement, React.CSSProperties> = {
    topLeft: {
      top: `${rect.top - rect.height}px`,
      left: `${rect.left}px`,
      transform: 'translate(0, 0)',
    },
    top: {
      top: `${rect.top}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translate(-50%, -100%)',
    },
    topRight: {
      top: `${rect.top - rect.height}px`,
      left: `${rect.left}px`,
      transform: 'translate(100%, 0)',
    },
    rightTop: {
      right: `${rect.right}px`,
      left: `${rect.left}px`,
      transform: 'translate(0, 0)',
    },
    right: {
      top: `${rect.top}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translate(-50%, -100%)',
    },
    rightBottom: {
      top: `${rect.top - rect.height}px`,
      left: `${rect.left}px`,
      transform: 'translate(100%, 0)',
    },
    bottom: {
      top: `${rect.bottom}px`,
      left: `${rect.left}px`,
    },
  };

  return placementPositions[placement];
};
