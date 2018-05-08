const Schema = require('../../src/Schema');

describe('Schema.object', () => {
  test('Returns valid object', () => {
    const testData = { test: {} };

    expect(Schema.object('test', testData)).toBe(testData.test);
  });

  test('Returns error', () => {
    const testData = { test: 1 };

    const checked = Schema.object('test', testData);

    expect(checked).toBeInstanceOf(TypeError);
    expect(checked).toMatchSnapshot();
  });

  test('__type', () => {
    expect(Schema.object.__type).toBe('object');
  });
});
