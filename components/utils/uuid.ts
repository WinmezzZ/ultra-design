export default function uuid() {
  return URL.createObjectURL(new Blob()).substr(-36);
}
