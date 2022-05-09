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
import React, { useState, useRef } from 'react';
import { Input, Button } from 'ultra-design';
import { css } from '@emotion/react';
import data from './icons.json';

const iconsData: any = data;
const allKeys = Object.keys(data);

export default function () {
  const [visibleKeys, setVisibleKeys] = useState(allKeys);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = () => {
    if (!inputRef.current) return;

    if (!inputRef.current.value) {
      return setVisibleKeys(allKeys);
    }

    setVisibleKeys(allKeys.filter(k => k.includes(inputRef.current!.value)));
  };
  return (
    <div css={iconPageStyle}>
      <div className="search-form">
        <Input className="search-input" ref={inputRef} onClear={onSearch} placeholder="Please Input..." clearable />
        <Button type="primary" onClick={onSearch}>
          Search
        </Button>
      </div>
      <div className="icon-list">
        {visibleKeys.map(d => (
          <div className="icon-item" key={d}>
            <div className="icon-name">{iconsData[d].name}</div>
            <span className="icon-wrapper" dangerouslySetInnerHTML={{ __html: iconsData[d].svg }}></span>
          </div>
        ))}
      </div>
    </div>
  );
}

const iconPageStyle = css`
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
      background: #fff;
      border: 1px solid #f0f0f0;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        box-shadow: 0 1px 10px 0 rgb(0 0 0 / 25%);
        .icon-name {
          color: #13c2c2;
        }
      }
      .icon-name {
        color: #222;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .icon-wrapper {
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;
```

## API

| Name | Description          | Type            | Default |
| ---- | -------------------- | --------------- | ------- |
| size | svg width/svg height | `string/number` | `18`    |
