import { css } from '@emotion/react';
import { ConfigProviderProps } from '..';
import { fade } from '../utils/fade';
import { MergedUploadProps } from './upload';

type UploadStylesProps = MergedUploadProps & ConfigProviderProps;

export const uploadStyles = (props: UploadStylesProps) => {
  const { radius, errorColor } = props.theme.style;
  const { textColor, borderColor } = props.theme[props.theme.mode];

  return css`
    * {
      box-sizing: border-box;
    }
    box-sizing: border-box;
    color: ${textColor};
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .ultra-uplopd-item {
      position: relative;
      cursor: pointer;

      border-radius: ${radius}px;
      border: 1px solid ${borderColor};
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
      &:not(.ultra-uplopd-item--add) {
        .ultra-uplopd-item__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ultra-uplopd-item__remove {
          width: 18px;
          height: 18px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          visibility: hidden;
          color: #ffffff;
          opacity: 1;
          position: absolute;
          top: 4px;
          right: 4px;
          transition: opacity 0.3s;
          z-index: 10;
          .i-icon {
            display: inline-flex;
            align-items: center;
          }
          &:hover {
            background-color: #ffffff;
            border-radius: 50%;
            color: ${textColor};
          }
        }
        .ultra-uplopd-item__error {
          width: 100%;
          background-color: ${fade(errorColor, 0.8)};
          padding: 4px;
          position: absolute;
          bottom: 4px;
          color: #fff;
          display: flex;
          z-index: 11;
          .i-icon {
            display: flex;
            align-items: center;
            margin-right: 4px;
          }
          &_text {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 12px;
          }
        }
        &:before {
          visibility: hidden;
          opacity: 0;
          background-color: ${fade('#000000', 0.4)};
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 1;
        }
        &:hover {
          &:before,
          .ultra-uplopd-item__remove {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }
    .ultra-uplopd-input {
      visibility: hidden;
      width: 0;
      height: 0;
      overflow: hidden;
    }
  `;
};
