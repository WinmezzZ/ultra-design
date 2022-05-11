---
nav:
  title: Components
  path: /components
group:
  title: Basic
  order: 0
---

# Icon

## Install

```bash
npm install --save ultra-icon
```

## Usage

```jsx | pure
import { AddIcon } from 'ultra-icon';

<AddIcon />;
```

## All Icons

```tsx
/**
 * inline: true
 */
import React, { useState, useEffect, useContext } from 'react';
import { Input, Loading, Toast } from 'ultra-design';
import { ConfigContext, ConfigProviderProps } from '../config-provider/config-provider';
import copy from '../utils/copyToClipboard';
import { fade } from '../utils/fade';
import { useDebounce } from 'winhooks';
import { css } from '@emotion/react';
import data from './icons.json';

const iconsData: any = data;
const allKeys = Object.keys(data);

export default function () {
  const [visibleKeys, setVisibleKeys] = useState(allKeys);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 300);
  const configContext = useContext(ConfigContext);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setVisibleKeys(allKeys.filter(k => k.includes(debouncedKeyword)));
      setLoading(false);
    }, 50);
  }, [debouncedKeyword]);

  const copyToClickboard = (name: string) => {
    copy(name);
    Toast.success('Copied Success');
  };

  return (
    <div css={iconPageStyle(configContext)}>
      <div className="search-form">
        <Input
          className="search-input"
          value={keyword}
          onChange={value => setKeyword(value)}
          placeholder="Please Input..."
          clearable
        />
      </div>
      <div className="icon-list">
        {visibleKeys.map(d => (
          <div className="icon-item" key={d} onClick={() => copyToClickboard(iconsData[d].camelCaseName)}>
            <div className="icon-name">{iconsData[d].name}</div>
            <span className="icon-wrapper" dangerouslySetInnerHTML={{ __html: iconsData[d].svg }}></span>
            <div className="copy-text">Click to copy icon name</div>
          </div>
        ))}
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
            display: block;
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

| Name | Description          | Type            | Default |
| ---- | -------------------- | --------------- | ------- |
| size | svg width/svg height | `string/number` | `18`    |
