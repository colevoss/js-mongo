const Schema = require('../../src/Schema');

describe('Schema.array', () => {
  test('Returns valid array', () => {
    const testData = { test: [] };

    expect(Schema.array('test', testData)).toBe(testData.test);
  });

  test('Returns error', () => {
    const testData = { test: 1 };

    const checked = Schema.array('test', testData);

    expect(checked).toBeInstanceOf(TypeError);
    expect(checked).toMatchSnapshot();
  });

  test('__type', () => {
    expect(Schema.array.__type).toBe('array');
  });
});
