import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div');

  el.setAttribute('id', id);

  return el;
};

const uuid = () => URL.createObjectURL(new Blob()).substr(-36);

export const usePortal = (selectId: string, getContainer?: () => HTMLElement | undefined | null) => {
  const id = selectId || uuid();
  const [elSnapshot, setElSnapshot] = useState<HTMLElement | null>(createElement(id));

  useEffect(() => {
    const customContainer = getContainer ? getContainer() : null;

    const parentElement = customContainer || document.body;
    const hasElement = customContainer || parentElement.querySelector<HTMLElement>(`#${id}`);
    const el = hasElement || createElement(id);

    if (!hasElement) {
      parentElement.appendChild(el);
    }
    setElSnapshot(el);
  }, [getContainer]);

  return elSnapshot;
};

interface PortalProps {
  id: string;
  getContainer?: () => HTMLElement | null | undefined;
}

const Portal: FC<PortalProps> = props => {
  const { children, getContainer, id } = props;
  const el = usePortal(id, getContainer);

  if (!el) return null;

  return createPortal(children, el);
};

export default Portal;
