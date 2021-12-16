import { sum, obj, null_, zero, four, zeroDotThree, fruitList } from '../test';

describe('相等', () => {
  it('toBe', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('toEqual ', () => {
    expect(obj).toEqual({ a: 1, b: 2 });
  });
});

describe('相反', () => {
  it('not', () => {
    expect(sum(1, 2)).not.toBe(4);
  });
});

describe('真值', () => {
  it('null', () => {
    expect(null_).toBeNull();
    expect(null_).toBeDefined();
    expect(null_).not.toBeUndefined();
    expect(null_).not.toBeTruthy();
    expect(null_).toBeFalsy();
  });

  it('zero', () => {
    expect(zero).not.toBeNull();
    expect(zero).toBeDefined();
    expect(zero).not.toBeUndefined();
    expect(zero).not.toBeTruthy();
    expect(zero).toBeFalsy();
  });
});

describe('数字', () => {
  it('less or greater', () => {
    expect(four).toBeGreaterThan(3);
    expect(four).toBeGreaterThanOrEqual(3.5);
    expect(four).toBeLessThan(5);
    expect(four).toBeLessThanOrEqual(4.5);
  });

  it('float number equal', () => {
    expect(zeroDotThree).toBeCloseTo(0.3);
  });
});

describe('包含', () => {
  expect(fruitList).toContain('apple');
});
