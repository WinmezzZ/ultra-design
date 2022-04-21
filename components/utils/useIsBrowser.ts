export default function useIsBrowser(): boolean {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}
