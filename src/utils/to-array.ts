export const toArray = <T>(value: T | T[] | undefined) : T[] => {
  return Array.isArray(value) ? value : value ? [value] : [];
};

const value: number | number | undefined = 1;

toArray(value);