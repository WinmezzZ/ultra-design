import clsx from 'clsx';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../button';
import Input from '../input';
import Popover from '../popover';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';
import { colorPickerStyles } from './color-picker-styles';
import { hex2rgb, rgb2hsv, rgb2hex, transformColor, toRgb } from './color-transform';
import MoveContainer, { Position } from './move-container';
import { validHex } from './utils';

export interface ColorPickerProps {
  /**
   * @description.zh-CN 颜色值，默认使用 16 进制格式，可以通过配置 `colorFormat` 切换成 `rgb格式`
   * @description.en-US color value,By default, `HEX` format is used. You can switch to 'tGB' format by setting `colorFormat`
   */
  value?: string;
  /**
   * @description.zh-CN 颜色改变时触发的回调函数
   * @description.en-US The callback function trigger when the color changes
   */
  onChange?: (value: string) => void;
  /**
   * @description.zh-CN 颜色值格式，默认 'HEX' 格式
   * @description.en-US color format, use `HEX` as default
   * @default HEX
   */
  colorFormat?: 'HEX' | 'RGB';
  /**
   * @description.zh-CN 是否显示透明度模块
   * @description.en-US hether to show the transparency module
   * @default false
   */
  showOpacity?: boolean;
  children?: React.ReactNode;
  className?: string;
  layerClassName?: string;
}

const defaultProps = {
  value: '#13c2c2',
  colorFormat: 'HEX',
};

export type MergedColorPickerProps = typeof defaultProps & ColorPickerProps;

const basicColors = [
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#8b572a',
  '#7ed321',
  '#417505',
  '#bd10e0',
  '#9013fe',
  '#4a90e2',
  '#50e3c2',
  '#b8e986',
  '#000000',
  '#4a4a4a',
  '#9b9b9b',
  '#ffffff',
];

const WIDTH = 200;
const HEIGHT = 150;

const ColorPicker: FC<ColorPickerProps> = p => {
  const props = useMergeProps(defaultProps, p);
  const { children, className, layerClassName, value, colorFormat, onChange, showOpacity, ...rest } = props;
  const [selfColor, setSelfColor] = useState(value);
  const rgbColor = useMemo(() => hex2rgb(selfColor), [selfColor]);
  const [hsvColor, setHsvColor] = useState(rgb2hsv(rgbColor));

  useEffect(() => {
    setHsvColor(rgb2hsv(rgbColor));
  }, [rgbColor]);

  const saturationPosition = useMemo(
    () => ({
      x: (hsvColor.s / 100) * WIDTH,
      y: ((100 - hsvColor.v) / 100) * HEIGHT,
    }),
    [hsvColor.s, hsvColor.v],
  );

  const huePosition = useMemo(
    () => ({
      x: (hsvColor.h / 360) * WIDTH,
    }),
    [hsvColor.h],
  );

  const opacityPosition = useMemo(
    () => ({
      x: (hsvColor.a ?? 1) * WIDTH,
    }),
    [hsvColor.a],
  );

  const rgb = useMemo(() => {
    return `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
  }, [rgbColor]);

  const rgba = useMemo(() => {
    return `${rgb}, ${rgbColor.a?.toFixed(3) ?? 1}`;
  }, [rgb, rgbColor]);

  const getValueRGB = useMemo(
    () => ({
      value: `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}${
        showOpacity && rgbColor.a !== undefined ? `, ${rgbColor.a?.toFixed(3)}` : ''
      }`,
      inputted: false,
    }),
    [rgbColor, showOpacity],
  );

  const [valueRGB, setValueRGB] = useState(getValueRGB);

  const getValueHEX = useCallback(() => ({ value: selfColor, inputted: false }), [selfColor]);

  const [valueHEX, setValueHEX] = useState(getValueHEX);

  useEffect(() => {
    if (!valueHEX.inputted) {
      setValueHEX(getValueHEX);
    }
  }, [valueHEX.inputted, getValueHEX]);

  useEffect(() => {
    if (!valueRGB.inputted) {
      setValueRGB(getValueRGB);
    }
  }, [valueRGB.inputted, getValueRGB]);

  const changeHEX = (value: string) => {
    if (validHex(value)) {
      setSelfColor(value);
      setValueHEX({ ...valueHEX, value });
    }
  };

  const changeRGB = (v: string) => {
    const value = v.match(/\d+(?:\.\d+)?/g);

    if (value && (value.length === 3 || (showOpacity && value.length === 4))) {
      const rgb = toRgb(value);

      setSelfColor(rgb2hex(rgb));
    }

    setValueRGB({ ...valueRGB, value: v });
  };

  const onSaturationChange = ({ x, y }: Position) => {
    const newHsv = { ...hsvColor, s: (x / WIDTH) * 100, v: 100 - (y / HEIGHT) * 100 };
    const newColor = transformColor('hsv', newHsv).hex;

    setSelfColor(newColor);
    setHsvColor(newHsv);
  };

  const onHUEChange = ({ x }: Position) => {
    const newHsv = { ...hsvColor, h: (x / WIDTH) * 360 };
    const newColor = transformColor('hsv', newHsv).hex;

    setSelfColor(newColor);
    setHsvColor(newHsv);
  };

  const onOpacityChange = ({ x }: Position) => {
    const newHsv = { ...hsvColor, a: x / WIDTH };
    const newColor = transformColor('hsv', newHsv).hex;

    setSelfColor(newColor);
    setHsvColor(newHsv);
  };

  useEffect(() => {
    if (selfColor === undefined) return;
    const color = colorFormat === 'RGB' ? `rgb${showOpacity ? 'a' : ''}(${valueRGB.value})` : selfColor;

    onChange?.(color);
  }, [selfColor, valueRGB.value, colorFormat, showOpacity]);

  return (
    <Popover
      layerClassName={layerClassName}
      content={
        <div className={clsx('ultra-color-picker', className)} {...rest} css={colorPickerStyles(props)}>
          <div className="ultra-color-picker__basic_color">
            {basicColors.map(color => (
              <div
                className="ultra-color-picker__basic_color-item"
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => setSelfColor(color)}
              ></div>
            ))}
          </div>

          <MoveContainer
            onChange={onSaturationChange}
            className="ultra-color-picker_saturation"
            style={{ backgroundColor: `hsl(${transformColor('hsv', hsvColor).hsv.h}, 100%, 50%)` }}
          >
            <div
              className="ultra-color-picker_saturation_cursor"
              style={{ left: saturationPosition.x, top: saturationPosition.y, backgroundColor: selfColor }}
            ></div>
          </MoveContainer>
          <MoveContainer onChange={onHUEChange} className="ultra-color-picker_hue">
            <div
              className="ultra-color-picker_hue_cursor"
              style={{
                left: huePosition.x,
                backgroundColor: `hsl(${transformColor('hsv', hsvColor).hsv.h}, 100%, 50%)`,
              }}
            ></div>
          </MoveContainer>
          {showOpacity && (
            <MoveContainer
              onChange={onOpacityChange}
              className="ultra-color-picker_opacity"
              style={{
                background: `linear-gradient(to right, rgba(${rgb}, 0), rgba(${rgb}, 1)) top left / auto auto,
              conic-gradient(#666 0.25turn, #999 0.25turn 0.5turn, #666 0.5turn 0.75turn, #999 0.75turn) top left / 12px 12px
              repeat`,
              }}
            >
              <div
                className="ultra-color-picker_opacity_cursor"
                style={{
                  left: opacityPosition.x,
                  background: `linear-gradient(to right, rgba(${rgba}), rgba(${rgba})) top left / auto auto,
                conic-gradient(#666 0.25turn, #999 0.25turn 0.5turn, #666 0.5turn 0.75turn, #999 0.75turn) ${
                  -opacityPosition - 2
                }px 2px / 12px 12px
                repeat`,
                }}
              />
            </MoveContainer>
          )}
          <div className="ultra-color-picker_input">
            <Input
              label="HEX"
              value={valueHEX.value}
              onChange={changeHEX}
              onFocus={() => setValueHEX({ ...valueHEX, inputted: true })}
              onBlur={() => setValueHEX({ ...valueHEX, inputted: false })}
            />
            <Input
              label="RGB"
              value={valueRGB.value}
              onFocus={() => setValueRGB({ ...valueRGB, inputted: true })}
              onChange={changeRGB}
              onBlur={() => setValueRGB({ ...valueRGB, inputted: false })}
            />
          </div>
        </div>
      }
    >
      {children || <Button style={{ backgroundColor: selfColor }} />}
    </Popover>
  );
};

ColorPicker.displayName = 'UltraColorPicker';

export default withStyle(ColorPicker);
