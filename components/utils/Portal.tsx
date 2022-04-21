import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import useIsBrowser from './useIsBrowser';

interface PortalProps {
  id: string;
  getContainer?: () => HTMLElement | null | undefined;
  style?: React.CSSProperties;
}

const Portal: FC<PortalProps> = props => {
  const { children, getContainer, id } = props;
  const isBrowser = useIsBrowser();
  const portalContainer = React.useMemo(() => {
    if (!isBrowser) {
      return;
    }
    if (typeof getContainer === 'function' && getContainer()) return getContainer();
    const id$ = id || 'ultra-portal';
    let searchModalContainer$ = document.querySelector(`#${id}`);

    if (!searchModalContainer$) {
      const containerDiv = document.createElement('div');

      containerDiv.id = id$;
      containerDiv.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;z-index:1000');

      document.body.appendChild(containerDiv);
      searchModalContainer$ = containerDiv;
    }

    return searchModalContainer$;
  }, []);

  return createPortal(children, portalContainer || document.body);
};

export default Portal;
