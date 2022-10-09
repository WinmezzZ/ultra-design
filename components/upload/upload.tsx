import { Close, Info, Plus } from '@icon-park/react';
import { isNil } from 'lodash-es';
import React, { ChangeEvent, forwardRef, ReactNode, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Tooltip from '../tooltip';
import { useMergeProps } from '../utils/mergeProps';
import withStyle from '../utils/withStyle';
import { uploadStyles } from './upload-styles';

export interface UploadProps {
  /**
   * @description.zh-CN 默认显示图片列表
   * @description.en-US default images
   */
  fileList?: BaseImageData[];
  /**
   * @description.zh-CN 文件列表改变后的回调
   * @description.en-US after image list change callback
   */
  onChange?: (imageList: BaseImageData[]) => void;
  /**
   * @description.zh-CN 点击每个文件后的回调
   * @description.en-US image click callback
   */
  onClick?: (image: BaseImageData) => void;
  /**
   * @description.zh-CN 删除图片后的回调
   * @description.en-US after remove image callback
   */
  onRemove?: (image: BaseImageData) => void;
  /**
   * @description.zh-CN 是否支持一次选择多个文件
   * @description.en-US support select multi files
   * @default true
   */
  multiple?: boolean;
  /**
   * @description.zh-CN 支持的文件后缀名
   * @description.en-US support file extensions
   * @default ['.jpg', '.jpeg', '.gif', '.png']
   */
  extensions?: string[];
  /**
   * @description.zh-CN 上传的图片不是合法的后缀名触发的回调
   * @description.en-US A callback triggered by an uploaded image is not a valid suffix
   */
  onOverExtensions?: (
    ext: string,
    extensions: string[],
  ) => (void | 'continue' | 'break') | Promise<void | 'continue' | 'break'>;
  /**
   * @description.zh-CN 图片最大数量
   * @description.en-US max image counts
   * @default 10
   */
  maxCount?: number;
  /**
   * @description.zh-CN 上传的图片超过最大数量限制后的回调
   * @description.en-US A callback after the maximum number of images uploaded exceeds the limit
   */
  onOverCount?: (count: number, maxCount: number) => (void | false) | Promise<void | false>;
  /**
   * @description.zh-CN 图片最大的字节数
   * @description.en-US max byte count
   * @default 5242880
   */
  maxSize?: number;
  /**
   * @description.zh-CN 上传的图片大小超过限制后的回调
   * @description.en-US A callback after the size of an uploaded image exceeds the limit
   */
  onOverSize?: (size: number, maxSize: number) => (void | 'continue' | 'break') | Promise<void | 'continue' | 'break'>;
  /**
   * @description.zh-CN 在图片中显示错误信息
   * @description.en-US show an error message in the image
   */
  renderError?: (image: ImageData) => React.ReactNode;
  /**
   * @description.zh-CN 添加头部内容
   * @description.en-US add header content
   */
  header?: React.ReactNode;
  /**
   * @description.zh-CN 添加尾部内容
   * @description.en-US add footer content
   */
  footer?: React.ReactNode;
  name?: string;
  children?: ReactNode;
}

const defaultProps = {
  maxSize: 5242880,
  maxCount: 10,
  fileList: [],
  extensions: ['.jpg', '.jpeg', '.gif', '.png'],
  multiple: true,
};

export type MergedUploadProps = typeof defaultProps & UploadProps;

interface BaseImageData {
  url: string;
  name?: string;
}

enum ErrorType {
  OVER_COUNT,
  OVER_SIZE,
  OVER_EXTENSTIONS,
  SERVER_ERROR,
}

interface ImageData extends BaseImageData {
  file?: File;
  errorCode?: keyof typeof ErrorType;
}

const uuid = () => URL.createObjectURL(new Blob()).substr(-36);

export interface UploadRef {
  imageList: ImageData[];
}

const UploadCompoent = forwardRef<UploadRef, UploadProps>((p, ref) => {
  const props = useMergeProps(defaultProps, p);
  const {
    fileList,
    onChange,
    onRemove,
    name,
    maxCount,
    onOverCount,
    onOverSize,
    onOverExtensions,
    extensions,
    multiple,
    maxSize,
    renderError,
    children,
  } = props;
  const [imageList, setImageList] = useState<ImageData[]>(() => {
    return fileList.map(f => ({
      ...f,
      name: f.url.substring(f.url.lastIndexOf('/') + 1),
    }));
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      imageList,
    }),
    [imageList],
  );

  const overCountNum = useMemo(() => {
    return imageList.filter(images => isNil(images.errorCode)).length - maxCount;
  }, [imageList, maxCount]);

  const onSelectFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const allFilePromises = [];
    const fileErrorList: (keyof typeof ErrorType)[] = [];

    for (const file of files) {
      if (!hasExtension(file.name)) {
        fileErrorList.push('OVER_EXTENSTIONS');
        if (typeof onOverExtensions === 'function') {
          const overExtensions = await onOverExtensions(file.name, extensions);

          if (overExtensions === 'continue') continue;
          else if (overExtensions === 'break') break;
        }
      } else if (file.size > maxSize) {
        fileErrorList.push('OVER_SIZE');
        if (typeof onOverSize === 'function') {
          const overSize = await onOverSize(file.size, maxSize);

          if (overSize === 'continue') continue;
          else if (overSize === 'break') break;
        }
      }

      allFilePromises.push(readFile(file));
    }

    const thisTimeOverCount = imageList.length + files.length - maxCount;

    if (thisTimeOverCount > 0) {
      if (typeof onOverCount === 'function') {
        const overCount = await onOverCount(maxCount + thisTimeOverCount, thisTimeOverCount);

        if (overCount === false) return;
      }
      const startIndex = files.length - thisTimeOverCount;

      allFilePromises.splice(startIndex - 1, thisTimeOverCount);
    }

    Promise.all(allFilePromises).then(newFilesData => {
      const data = newFilesData.map((item, i) => ({
        file: item.file,
        url: item.url,
        name: item.file.name,
        errorCode: fileErrorList[i],
      }));
      const list = [...imageList, ...data];

      onChange?.(list);
      setImageList(list);
    });
  };

  const onDelete = (index: number) => {
    const list = [...imageList];

    onRemove?.(list[index]);
    list.splice(index, 1);
    onChange?.(list);
    setImageList(list);
  };

  const simulatorClick = () => {
    inputRef.current?.click();
  };

  const hasExtension = (fileName: string) => {
    if (!extensions.length) return false;
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
        let dataURL = r.result as string;

        dataURL = dataURL.replace(';base64', `;name=${file.name};base64`);
        resolve({ file, url: dataURL });
      };

      reader.readAsDataURL(file);
    });
  };

  const customAdd = children || <Plus size="24" />;

  return (
    <div className="ultra-upload" css={uploadStyles(props)}>
      {props.header}
      <div className="ultra-uplopd-content">
        {imageList.map((img, index) => (
          <div className="ultra-uplopd-item" key={img.name + uuid()}>
            <img className="ultra-uplopd-item__img" src={img.url} />
            <span className="ultra-uplopd-item__remove" onClick={() => onDelete(index)}>
              <Close size="12" />
            </span>
            {img.errorCode && (
              <Tooltip title={renderError?.(img)}>
                <div className="ultra-uplopd-item__error">
                  <Info size="16" />
                  <div className="ultra-uplopd-item__error_text">{renderError?.(img)}</div>
                </div>
              </Tooltip>
            )}
          </div>
        ))}
        {overCountNum < 0 && (
          <div className="ultra-uplopd-item ultra-uplopd-item--add" onClick={simulatorClick}>
            {customAdd}
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
          accept="image/*"
        />
      </div>
      {props.footer}
    </div>
  );
});

UploadCompoent.displayName = 'UltraUpload';

const Upload = withStyle(UploadCompoent);

export default Upload;
