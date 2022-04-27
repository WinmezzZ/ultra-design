import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import useIsBrowser from './useIsBrowser';

interface PortalProps {
  container: Element | null;
}

const PortalComponent: FC<PortalProps> = ({ container, children }) => {
  if (!container) return null;

  return createPortal(children, container);
};

interface usePortaloptions {
  id?: string | Element;
  attrs?: Record<string, string>;
}

export default function usePortal(options?: usePortaloptions) {
  const isBrowser = useIsBrowser();
  const { id, attrs } = options || {};
  const portalContainer = React.useMemo(() => {
    if (!isBrowser) {
      return null;
    }

    if (!options) {
      return document.body;
    }

    if (id instanceof HTMLElement) {
      return id;
    } else if (typeof id === 'string') {
      const selector$ = id || 'ultra-portal';
      let searchModalContainer$ = document.querySelector(`#${id}`);

      if (!searchModalContainer$) {
        const containerDiv = document.createElement('div');

        containerDiv.id = selector$;
        containerDiv.setAttribute('style', 'position: absolute;top: 0px;left: 0px;width: 100%;z-index:1000');
        if (attrs) {
          for (const key in attrs) {
            containerDiv.setAttribute(key, attrs[key]);
          }
        }
        document.body.appendChild(containerDiv);
        searchModalContainer$ = containerDiv;
      }

      return searchModalContainer$;
    } else {
      return document.body;
    }
  }, []);

  const Portal = React.useMemo(() => {
    const Portal_: FC = ({ children }) => {
      return <PortalComponent container={portalContainer}>{children}</PortalComponent>;
    };

    return Portal_;
  }, [portalContainer]);

  return {
    Portal: Portal,
    portalContainer,
  };
}
