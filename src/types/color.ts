
export enum ColorMap {
  'danger' = 'red',
  'success' = 'green',
  'warning' = 'yellow',
  'info' = 'gray',
  'primary' = 'primary',
}

export type Color = keyof typeof ColorMap;