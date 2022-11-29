import { cloneElement, isValidElement, PropsWithChildren, useRef } from 'react';

export interface LazyProps {
  visible: boolean;
}

function Lazy({ visible, children }: PropsWithChildren<LazyProps>) {
  const rendered = useRef(visible);

  if (visible && !rendered.current) {
    rendered.current = true;
  }

  if (!rendered.current) return null;

  if (!isValidElement(children)) return <div style={{ ...(!visible ? { display: 'none' } : {}) }}>{children}</div>;

  return cloneElement(children as React.ReactElement, { style: { ...(!visible ? { display: 'none' } : {}) } });
}

export default Lazy;
