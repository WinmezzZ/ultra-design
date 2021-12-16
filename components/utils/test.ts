export const sum = (a: number, b: number) => {
  return a + b;
};

export const obj = {
  a: 1,
  b: 2,
};

export const null_ = null;
export const zero = 0;
export const four = 4;
export const zeroDotThree = 0.2 + 0.1;
export const fruitList = ['banana', 'oringe', 'apple'];

export const callbackFn = (cb: any) => {
  setTimeout(() => {
    cb('data');
  }, 200);
};
