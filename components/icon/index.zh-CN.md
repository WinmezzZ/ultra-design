---
nav:
  title: 组件
  path: /components
group:
  title: 基本组件
  order: 0
---

# Icon 图标

`ultra-icon` 图标集合，目前已经录入 2000 多个图标，支持 `npm` 方式导入，支持 `tree shaking`
按需加载

## 安装

```bash
npm install --save ultra-icon
```

## 使用

```jsx | pure
import { AddIcon } from 'ultra-icon';

<AddIcon />;
```

## 全部 Icon

```tsx
/**
 * inline: true
 */
import React, { useState, useEffect, useContext } from 'react';
import { Loading, Toast, Tabs } from 'ultra-design';
import { ConfigContext, ConfigProviderProps } from '../config-provider/config-provider';
import copy from '../utils/copyToClipboard';
import { fade } from '../utils/fade';
import { useDebounce } from 'winhooks';
import { css } from '@emotion/react';
import data from './icons.json';

interface Icon {
  id: number;
  name: string;
  svg: string;
  camelCaseName: string;
  type: string;
}

const iconsData: Record<string, Icon> = data;
const iconList: Icon[] = [];
let count = 0;

const dataMap: { iconType: string; icons: Icon[] }[] = [];
const iconTypes: string[] = [];

for (const key in iconsData) {
  count++;
  const iconItem = iconsData[key];
  iconList.push(iconItem);
  const iconType = iconItem.type;
  if (!dataMap.some(item => item.iconType === iconType)) {
    iconTypes.push(iconType);
    dataMap.push({
      iconType,
      icons: [iconItem],
    });
  } else {
    const index = dataMap.findIndex(item => item.iconType === iconType);
    dataMap[index].icons.push(iconItem);
  }
}

export default function () {
  const [keyword] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 300);
  const configContext = useContext(ConfigContext);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // setVisibleTypeIcons(allKeys.filter(k => k.includes(debouncedKeyword)));
      setLoading(false);
    }, 50);
  }, [debouncedKeyword]);

  let timer: NodeJS.Timeout | null = null;

  const copyToClickboard = (name: string) => {
    Toast.clear();
    if (copied && timer) {
      clearInterval(timer);
      timer = null;
    }
    setCopied(true);
    copy(name);
    Toast.success('已复制');
    timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div css={iconPageStyle(configContext)}>
      <h4>
        全部 icon <span className="icon-count">（{count}个）</span>
      </h4>
      <div className="icon-list">
        <Tabs value={dataMap[0].iconType}>
          {dataMap.map(iconData => (
            <Tabs.Item key={iconData.iconType} label={iconData.iconType} value={iconData.iconType}>
              {iconData.icons.map(icon => (
                <div className="icon-item" key={icon.id} onClick={() => copyToClickboard(icon.camelCaseName)}>
                  <div className="icon-name">{icon.name}</div>
                  <span className="icon-wrapper" dangerouslySetInnerHTML={{ __html: icon.svg }}></span>
                  <div className="copy-text">点击复制 icon name</div>
                </div>
              ))}
            </Tabs.Item>
          ))}
        </Tabs>

        {loading && <Loading fill />}
      </div>
    </div>
  );
}

const iconPageStyle = (configContext: ConfigProviderProps) => {
  const { theme } = configContext;
  const { primaryColor } = theme.style;
  const { backgroundColor, borderColor, textColor } = theme[theme.mode];
  return css`
    color: ${textColor};
    margin-top: 20px;
    h4 {
      margin-bottom: 10px;
    }
    .search-form {
      display: flex;
      .search-input {
        flex: 1;
        margin-right: 10px;
      }
      margin-bottom: 30px;
    }
    .icon-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .icon-item {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 100px;
        background: ${backgroundColor};
        border: 1px solid ${borderColor};
        cursor: pointer;
        overflow: hidden;
        transition: box-shadow 300ms;
        &:hover {
          box-shadow: 0 1px 10px 0 rgb(0 0 0 / 25%);
          .icon-name {
            color: ${primaryColor};
          }
          .copy-text {
            opacity: 1;
          }
        }
        .icon-name {
          font-size: 12px;
          margin-bottom: 10px;
          transition: color 300ms;
        }
        .icon-wrapper {
          svg {
            fill: currentColor;
            width: 24px;
            height: 24px;
          }
        }

        .copy-text {
          display: none;
          color: ${fade(textColor, 0.6)};
          margin-top: 5px;
          opacity: 0;
          font-size: 12px;
          transition: opacity 300ms;
        }
      }
    }
  `;
};
```

## API

| 属性名 | 描述                 | 类型            | 默认值 |
| ------ | -------------------- | --------------- | ------ |
| size   | svg width/svg height | `string/number` | `18`   |
