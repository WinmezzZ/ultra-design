import { css } from '@emotion/react';
import _ from 'lodash-es';
import { ConfigProviderProps } from '../config-provider';
import { MergedDrawerrProps } from './drawer';

type DrawerStylesProps = MergedDrawerrProps & ConfigProviderProps;

export const drawerWrapperStyles = (props: DrawerStylesProps) => {
  const { theme } = props;
  const { textColor, thirdBackgroundColor } = theme[theme.mode];

  return css`
    position: fixed;
    inset: 0;
    z-index: 1000;
    color: ${textColor};
    pointer-events: none;
    .ultra-drawer {
      pointer-events: all;
      position: absolute;
      right: 0;
      height: 100%;
      max-width: 90%;
      background-color: ${thirdBackgroundColor};
      padding: 20px;
      overflow: auto;
      .ultra-drawer-header {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        &__title {
          flex: 1;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 500;
          font-size: 16px;
        }

        &__close {
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .ultra-drawer-body {
        padding: 20px 0;
      }
      .ultra-drawer-footer {
        text-align: right;
        button + button {
          margin-left: 10px;
        }
      }
    }
  `;
};
