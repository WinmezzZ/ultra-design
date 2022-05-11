import { css } from '@emotion/react';
import { ConfigProviderProps } from '..';
import { MergedColorPickerProps } from './color-picker';

type ColorPickerStylesProps = MergedColorPickerProps & ConfigProviderProps;

export const colorPickerStyles = (props: ColorPickerStylesProps) => {
  const { theme } = props;
  const { radius } = theme.style;
  const { textColor } = props.theme[props.theme.mode];

  return css`
    color: ${textColor};
    width: 200px;
    .ultra-color-picker__basic_color {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      &-item {
        border-radius: ${radius}px;
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
    .ultra-color-picker_saturation {
      width: 100%;
      position: relative;
      margin-top: 15px;
      height: 150px;
      background-image: linear-gradient(transparent, black), linear-gradient(to right, white, transparent);
      user-select: none;
      &_cursor {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 15px #00000026;
        box-sizing: border-box;
        transform: translate(-10px, -10px);
      }
    }
    .ultra-color-picker_hue {
      width: 100%;
      position: relative;
      margin-top: 15px;
      height: 12px;
      background-image: linear-gradient(
        to right,
        rgb(255, 0, 0),
        rgb(255, 255, 0),
        rgb(0, 255, 0),
        rgb(0, 255, 255),
        rgb(0, 0, 255),
        rgb(255, 0, 255),
        rgb(255, 0, 0)
      );
      user-select: none;
      border-radius: ${radius}px;

      &_cursor {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid #ffffff;
        border-radius: 50%;
        box-shadow: #0003 0 0 0 0.5px;
        box-sizing: border-box;
        transform: translate(-10px, -4px);
      }
    }

    .ultra-color-picker_opacity {
      width: 100%;
      margin-top: 10px;
      position: relative;
      height: 12px;
      user-select: none;
      border-radius: ${radius}px;
      &_cursor {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 2px solid #ffffff;
        border-radius: 50%;
        box-shadow: #0003 0 0 0 0.5px;
        box-sizing: border-box;
        transform: translate(-10px, -4px);
      }
    }
    .ultra-color-picker_input {
      .ultra-input-with_label {
        margin-top: 10px;
        .ultra-input {
          padding: 2px 4px;
        }
      }
    }
  `;
};
