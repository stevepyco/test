import {
  isArray,
  isObject,
  isString
} from './utils';

describe('isArray', () => {
  test('should be true when data is an array', () => {
    // Arrange
    const value = [];
    const expected = true;

    // Act
    const result = isArray(value);

    // Assert
    expect(result).toEqual(expected);
  });

  test('should be false when data is not an array', () => {
    // Arrange
    const value = {};
    const expected = false;

    // Act
    const result = isArray(value);

    // Assert
    expect(result).toEqual(expected);
  });
});

describe('isObject', () => {
  test('should be true when data is a object', () => {
    // Arrange
    const value = {};
    const expected = true;

    // Act
    const result = isObject(value);

    // Assert
    expect(result).toEqual(expected);
  });

  test('should be false when data is a string', () => {
    // Arrange
    const value = 'abc';
    const expected = false;

    // Act
    const result = isObject(value);

    // Assert
    expect(result).toEqual(expected);
  });

  test('should be false when data is null value', () => {
    // Arrange
    const value = null;
    const expected = false;

    // Act
    const result = isObject(value);

    // Assert
    expect(result).toEqual(expected);
  });

  test('should be false when data is undefined value', () => {
    // Arrange
    const value = undefined;
    const expected = false;

    // Act
    const result = isObject(value);

    // Assert
    expect(result).toEqual(expected);
  });
});

describe('isString', () => {
  test('should be true when data is a string', () => {
    // Arrange
    const value = 'abc';
    const expected = true;

    // Act
    const result = isString(value);

    // Assert
    expect(result).toEqual(expected);
  });

  test('should be false when data is not a string', () => {
    // Arrange
    const value = [];
    const expected = false;

    // Act
    const result = isString(value);

    // Assert
    expect(result).toEqual(expected);
  });
});