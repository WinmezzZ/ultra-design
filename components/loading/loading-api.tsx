import ReactDOM from 'react-dom';
import LoadingInternal, { LoadingProps, defaultProps } from './loading';
import { ConfigContext, PartialProviderConfig } from '../config-provider/config-provider';
import { mergeProps } from '../utils/mergeProps';

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

  ReactDOM.render(
    <ConfigContext.Consumer>
      {defaultConfig => {
        const props = mergeProps(defaultConfig, newConfig, { fullScreen: true, ...defaultProps, ...options });

        return <LoadingInternal {...props} />;
      }}
    </ConfigContext.Consumer>,
    root,
  );
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
};

export default loading;
