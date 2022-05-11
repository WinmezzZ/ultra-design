export default function copyToClipboard(content: string) {
  const mySmartTextarea = document.createElement('textarea');

  mySmartTextarea.innerHTML = content;
  const parentElement = document.getElementById('root');

  parentElement?.appendChild(mySmartTextarea);
  mySmartTextarea.select();
  document.execCommand('copy');
  parentElement?.removeChild(mySmartTextarea);
}
