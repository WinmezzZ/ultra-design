import ReactDOM from 'react-dom';
import LoadingInternal, { LoadingProps } from './loading';
import { ConfigContext, PartialProviderConfig } from '../config-provider/config-provider';
import { mergeProps } from '../utils/mergeProps';
import { FC, useContext, useEffect, useState } from 'react';
import { emitter } from '../utils/mitt';

interface LoadingConfig extends Omit<LoadingProps, 'fullScreen' | 'fill'>, PartialProviderConfig {}

let newConfig: LoadingConfig = {};

const unmountRoot = () => {
  const root = document.getElementById('ultra-loading');

  if (root) {
    ReactDOM.unmountComponentAtNode(root);

    return root;
  }
};

const createRoot = () => {
  const root = document.createElement('div');

  root.id = 'ultra-loading';
  document.body.appendChild(root);

  return root;
};

function loadingFn(options?: LoadingProps) {
  const root = unmountRoot() || createRoot();

  interface LoadingWrapperProps {
    options?: LoadingProps;
  }

  const LoadingWrapper: FC<LoadingWrapperProps> = props => {
    const { options } = props;
    const context = useContext(ConfigContext);
    const config = mergeProps(context, newConfig, options);

    const [loadingOptions, setLoadingOptions] = useState(config);

    useEffect(() => {
      emitter.on('loading-config', e => {
        setLoadingOptions(o => mergeProps(o, e));
      });

      return () => {
        emitter.all.clear();
      };
    }, []);

    return <LoadingInternal {...loadingOptions} />;
  };

  LoadingWrapper.defaultProps = {
    options: {
      fullScreen: true,
    },
  };

  ReactDOM.render(<LoadingWrapper options={options} />, root);
}

type LoadingInstance = typeof loadingFn & {
  clear: () => void;
  config: (config: LoadingConfig) => void;
};

/**
 * loading api function
 */
const loading = loadingFn as LoadingInstance;

loading.clear = unmountRoot;

loading.config = (config: LoadingConfig) => {
  newConfig = config;
  emitter.emit('loading-config', config);
};

export default loading;
