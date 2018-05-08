const Schema = require('../../src/Schema');

describe('Schema.date', () => {
  test('Returns valid date', () => {
    const testData = { test: new Date() };

    expect(Schema.date('test', testData)).toBe(testData.test);
  });

  test('Returns error', () => {
    const testData = { test: 1 };

    const checked = Schema.boolean('test', testData);

    expect(checked).toBeInstanceOf(TypeError);
    expect(checked).toMatchSnapshot();
  });

  test('__type', () => {
    expect(Schema.date.__type).toBe('date');
  });
});
