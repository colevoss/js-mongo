const Schema = require('../../src/Schema');

describe('Schema.shape', () => {
  const schema = Schema.shape({
    key1: Schema.string,
    key2: Schema.number,
  });

  test('Returns valid if state matches', () => {
    const testData = {
      test: {
        key1: 'test',
        key2: 1,
      },
    };

    expect(schema('test', testData)).toEqual(testData.test);
  });

  test('Returns error', () => {
    const testData = {
      test: {
        key1: 1,
        key2: 'string',
      },
    };

    const checked = schema('test', testData);

    expect(checked).toBeInstanceOf(Error);
    expect(checked).toMatchSnapshot();
  });

  test('__type', () => {
    expect(Schema.shape({}).__type).toBe('shape');
  });

  test('Throws error if an object is not supplied', () => {
    expect(() => Schema.shape()).toThrowErrorMatchingSnapshot();
  });
});
