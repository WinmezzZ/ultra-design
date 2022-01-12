import React from 'react';
import { PositionRect } from './trigger';

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

export const defaultTriggerPosition = {
  top: '-1000px',
  left: '-1000px',
  transform: 'none',
};

export interface TriggerPosition {
  top: string;
  left: string;
  transform: string;
}

export const getPosition = (placement: Placement, rect: PositionRect, offset: number) => {
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
