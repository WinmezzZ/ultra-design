import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div');

  el.setAttribute('id', id);

  return el;
};

interface PortalProps {
  id: string;
  getContainer?: () => HTMLElement | undefined | null;
}

const Portal: FC<PortalProps> = props => {
  const { children, getContainer, id } = props;
  const [container, setContainer] = useState<HTMLElement | null>(createElement(id));

  useEffect(() => {
    const customContainer = getContainer ? getContainer() : null;
    const parentElement = customContainer || document.body;
    const hasElement = parentElement.querySelector<HTMLElement>(`#${id}`);
    const el = hasElement || createElement(id);

    if (!hasElement) {
      parentElement.appendChild(el);
    }
    setContainer(el);
  }, [getContainer]);

  if (!container) return null;

  return createPortal(children, container);
};

export default Portal;
