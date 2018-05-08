const Schema = require('../../src/Schema');

describe('Schema.number', () => {
  test('Returns valid number', () => {
    const testData = { test: 2 };

    expect(Schema.number('test', testData)).toBe(testData.test);
  });

  test('Returns error', () => {
    const testData = { test: 'string' };

    const checked = Schema.number('test', testData);

    expect(checked).toBeInstanceOf(TypeError);
    expect(checked).toMatchSnapshot();
  });

  test('__type', () => {
    expect(Schema.number.__type).toBe('number');
  });
});
