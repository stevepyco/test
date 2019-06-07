import { store, load } from './data';

describe('Handle store function', () => {
	describe('return an empty string', () => {
    describe('from primitive data value: ', () => {
      test('null', () => {
        // Arrange
        const array = null;
        const expected = '';
  
        // Act
        const text = store(array);
  
        // Assert
        expect(text).toEqual(expected);
      });
      test('boolean', () => {
        // Arrange
        const array = false;
        const expected = '';
  
        // Act
        const text = store(array);
  
        // Assert
        expect(text).toEqual(expected);
      });
      test('undefined', () => {
        // Arrange
        const array = undefined;
        const expected = '';
  
        // Act
        const text = store(array);
  
        // Assert
        expect(text).toEqual(expected);
      });
      test('number', () => {
        // Arrange
        const array = 0;
        const expected = '';
  
        // Act
        const text = store(array);
  
        // Assert
        expect(text).toEqual(expected);
      });
      test('string', () => {
        // Arrange
        const array = '';
        const expected = '';
  
        // Act
        const text = store(array);
  
        // Assert
        expect(text).toEqual(expected);
      });
    })

    test('from empty object', () => {
      // Arrange
      const array = {};
      const expected = '';

      // Act
      const text = store(array);

      // Assert
      expect(text).toEqual(expected);
    });

    test('from object', () => {
      // Arrange
      const array = { key1: 'value1', key2: 'value2' };
      const expected = '';

      // Act
      const text = store(array);

      // Assert
      expect(text).toEqual(expected);
    });

    test('from empty array', () => {
      // Arrange
      const array = [];
      const expected = '';
  
      // Act
      const text = store(array);
  
      // Assert
      expect(text).toEqual(expected);
    });
  });
  
  test('return a string-type based format when data are valid', () => {
    // Arrange
    const array = [{ key1: 'value1', key2: 'value2' }, { keyA: 'valueA' }];
    const expected = 'key1=value1;key2=value2\nkeyA=valueA';

    // Act
    const text = store(array);

    // Assert
    expect(text).toEqual(expected);
  });
});

describe('Handle load function', () => {
  describe('return an empty array', () => {
    describe('from primitive data value: ', () => {
      test('null', () => {
        // Arrange
        const text = null;
        const expected = [];
  
        // Act
        const array = load(text);
  
        // Assert
        expect(array).toEqual(expected);
      });
      test('boolean', () => {
        // Arrange
        const text = false;
        const expected = [];
  
        // Act
        const array = load(text);
  
        // Assert
        expect(array).toEqual(expected);
      });
      test('undefined', () => {
        // Arrange
        const text = undefined;
        const expected = [];
  
        // Act
        const array = load(text);
  
        // Assert
        expect(array).toEqual(expected);
      });
      test('number', () => {
        // Arrange
        const text = 0;
        const expected = [];
  
        // Act
        const array = load(text);
  
        // Assert
        expect(array).toEqual(expected);
      });
      test('string', () => {
        // Arrange
        const text = '';
        const expected = [];
  
        // Act
        const array = load(text);
  
        // Assert
        expect(array).toEqual(expected);
      });
    })

    test('from empty object', () => {
      // Arrange
      const text = {};
      const expected = [];

      // Act
      const array = load(text);

      // Assert
      expect(array).toEqual(expected);
    });

    test('from object', () => {
      // Arrange
      const text = { key1: 'value1', key2: 'value2' };
      const expected = [];

      // Act
      const array = load(text);

      // Assert
      expect(array).toEqual(expected);
    });

    test('from empty array', () => {
      // Arrange
      const text = [];
      const expected = [];
  
      // Act
      const array = load(text);
  
      // Assert
      expect(array).toEqual(expected);
    });
  });

  test('from a valid string-type text', () => {
    // Arrange
    const text = 'key1=value1;key2=value2\nkeyA=valueA';
    const expected = [{ key1: 'value1', key2: 'value2' }, { keyA: 'valueA' }];

    // Act
    const array = load(text);

    // Assert
    expect(array).toStrictEqual(expected);
  });

  test('from a valid string-type text, a special case with more than a "=" character in "key*-value*" pair', () => {
    // Arrange
    const text = 'key1=value1=;key2=value2;';
    const expected = 'value1=';

    // Act
    const array = load(text);

    // Assert
    expect(array[0]['key1']).toEqual(expected);
  });

  test('from a valid string-type text, a special case with multiple ";" characters inline', () => {
    // Arrange
    const text = 'key1=value1;;;key2=value2;\nkeyA=valueA';
    const expected = [{ key1: 'value1', key2: 'value2' }, { keyA: 'valueA' }];

    // Act
    const array = load(text);

    // Assert
    expect(array).toStrictEqual(expected);
  });
});