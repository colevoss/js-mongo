const Schema = require('../../src/Schema');

describe('Schema.boolean', () => {
  test('Returns valid boolean', () => {
    const testData = { test: true };

    expect(Schema.boolean('test', testData)).toBe(testData.test);
  });

  test('Returns error', () => {
    const testData = { test: 1 };

    const checked = Schema.boolean('test', testData);

    expect(checked).toBeInstanceOf(TypeError);
    expect(checked).toMatchSnapshot();
  });

  test('__type', () => {
    expect(Schema.boolean.__type).toBe('boolean');
  });
});
