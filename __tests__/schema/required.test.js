const Schema = require('../../src/Schema');

describe('Schema.<type>.required', () => {
  test('Validates if value is provided for required key', () => {
    const testData = { test: 1 };

    const validated = Schema.number.required('test', testData);

    expect(validated).toBe(1);
  });

  test('Returns error if required key is not provided', () => {
    const testData = { notTest: 1 };

    const validated = Schema.number.required('test', testData);

    expect(validated).toBeInstanceOf(TypeError);
    expect(validated).toMatchSnapshot();
  });
});
