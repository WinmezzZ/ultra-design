import { PropsWithChildren, useRef } from 'react';

export interface LazyProps {
  visible: boolean;
}

function Lazy({ visible, children }: PropsWithChildren<LazyProps>) {
  const rendered = useRef(visible);

  if (visible && !rendered.current) {
    rendered.current = true;
  }

  if (!rendered.current) return null;

  return <div style={{ display: visible ? 'block' : 'none' }}>{children}</div>;
}

export default Lazy;
