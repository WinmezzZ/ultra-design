import { useEffect, useState } from 'react';

const createElement = (id: string): HTMLElement => {
  const el = document.createElement('div');

  el.setAttribute('id', id);

  return el;
};

const uuid = () => URL.createObjectURL(new Blob()).substr(-36);

const usePortal = (selectId: string, getContainer?: () => HTMLElement | null): HTMLElement | null => {
  const id = `ultra-${selectId || uuid()}`;
  const [elSnapshot, setElSnapshot] = useState<HTMLElement | null>(createElement(id));

  useEffect(() => {
    const customContainer = getContainer ? getContainer() : null;

    const parentElement = customContainer || document.body;
    const hasElement = parentElement.querySelector<HTMLElement>(`#${id}`);
    const el = hasElement || createElement(id);

    if (!hasElement) {
      parentElement.appendChild(el);
    }
    setElSnapshot(el);
  }, [getContainer]);

  return elSnapshot;
};

export default usePortal;
