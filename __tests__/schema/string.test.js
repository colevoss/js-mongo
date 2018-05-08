const Schema = require('../../src/Schema');

describe('Schema.string', () => {
  test('Returns valid string', () => {
    const testData = { test: 'test string' };

    expect(Schema.string('test', testData)).toBe(testData.test);
  });

  test('Returns error', () => {
    const testData = { test: 1 };

    const checked = Schema.string('test', testData);

    expect(checked).toBeInstanceOf(TypeError);
    expect(checked).toMatchSnapshot();
  });

  test('__type', () => {
    expect(Schema.string.__type).toBe('string');
  });
});
