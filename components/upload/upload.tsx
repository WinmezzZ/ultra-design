import { Close, Info } from '@icon-park/react';
import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import Tooltip from '../tooltip';
import { useMergeProps } from '../utils/mergeProps';
import { uploadStyles } from './upload-styles';

export interface UploadProps {
  /**
   * @description.zh-CN show url key
   * @description.en-US 显示 Command 按钮
   */
  url?: boolean;
  fileList?: BaseImageData[];
  onChange?: (fileList: BaseImageData[]) => void;
  name?: string;
  multiple?: boolean;
  accept?: string;
  maxCount?: number;
  onOverCount?: (count: number, maxCount: number) => void;
  maxSize?: number;
}

const defaultProps = {
  accept: 'image/*',
  // maxSize: 5242880,
  maxSize: 1,
  maxCount: 10,
  fileList: [],
};

export type MergedUploadProps = typeof defaultProps & UploadProps;

interface BaseImageData {
  url: string;
  name?: string;
}

interface ImageData extends BaseImageData {
  file?: File;
  error?: false | string;
}

const uuid = () => URL.createObjectURL(new Blob()).substr(-36);

const Upload: React.FC<UploadProps> = p => {
  const props = useMergeProps(defaultProps, p);
  const { url, fileList, onChange, name, maxCount, onOverCount, multiple, accept, maxSize, children } = props;
  const [imageList, setImageList] = useState<ImageData[]>(() => {
    return fileList.map(f => ({
      ...f,
      name: f.url.substring(f.url.lastIndexOf('/') + 1),
    }));
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const overCount = useMemo(() => {
    return imageList.filter(images => !images.error).length - maxCount;
  }, [imageList]);

  const onSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const allFilePromises = [];
    const fileErrorList: string[] = [];

    for (const file of files) {
      if (!hasExtension(file.name)) {
        fileErrorList.push('不支持的图片类型');
      } else if (file.size > maxSize) {
        fileErrorList.push(`文件大小超过限制：（${maxSize}）`);
      } else {
        fileErrorList.push('');
      }

      allFilePromises.push(readFile(file));
    }

    const thisTimeOverCount = imageList.filter(images => !images.error).length + files.length - maxCount;

    if (thisTimeOverCount > 0) {
      if (typeof onOverCount === 'function') {
        onOverCount?.(maxCount + thisTimeOverCount, thisTimeOverCount);
      }
      const startIndex = files.length - thisTimeOverCount;

      allFilePromises.splice(startIndex - 1, thisTimeOverCount);
    }

    Promise.all(allFilePromises).then(newFilesData => {
      const data = newFilesData.map((item, i) => ({
        file: item.file,
        url: item.url,
        name: item.file.name,
        error: fileErrorList[i],
      }));
      const list = [...imageList, ...data];

      onChange?.(list);
      setImageList(list);
    });
  };

  const onDelete = (index: number) => {
    const list = [...imageList];

    list.splice(index, 1);
    onChange?.(list);
    setImageList(list);
  };

  const simulatorClick = () => {
    inputRef.current?.click();
  };

  const hasExtension = (fileName: string) => {
    const extensions = ['.jpg', '.jpeg', '.gif', '.png'];
    const pattern = '(' + extensions.join('|').replace(/\./g, '\\.') + ')$';

    return new RegExp(pattern, 'i').test(fileName);
  };

  const readFile = (file: File) => {
    return new Promise<{ file: File; url: string }>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const r = e.target as FileReader;

        if (!r) return reject();
        if (!r.result) return reject();
        // Add the file name to the data URL
        let dataURL = r.result as string;

        dataURL = dataURL.replace(';base64', `;name=${file.name};base64`);
        resolve({ file, url: dataURL });
      };

      reader.readAsDataURL(file);
    });
  };

  if (!React.isValidElement(children)) return null;

  return (
    <div css={uploadStyles(props)}>
      {imageList.map((img, index) => (
        <div className="ultra-uplopd-item" key={img.name + uuid()}>
          <img className="ultra-uplopd-item__img" src={img.url} />
          <span className="ultra-uplopd-item__remove" onClick={() => onDelete(index)}>
            <Close size="12" />
          </span>
          {img.error && (
            <Tooltip title={img.error}>
              <div className="ultra-uplopd-item__error">
                <Info size="16" />
                <span className="ultra-uplopd-item__error_text">Upload Fail</span>
              </div>
            </Tooltip>
          )}
        </div>
      ))}
      {overCount < 0 && (
        <div className="ultra-uplopd-item ultra-uplopd-item--add" onClick={simulatorClick}>
          {children}
        </div>
      )}

      <input
        className="ultra-uplopd-input"
        type="file"
        ref={inputRef}
        name={name}
        multiple={multiple}
        // onChange={this.onDropFile}
        onClick={(e: any) => {
          e.target.value = null;
        }}
        onChange={onSelectFiles}
        accept={accept}
      />
    </div>
  );
};

Upload.displayName = 'UltraUpload';

export default Upload;
