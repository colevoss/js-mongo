const Schema = require('../../src/Schema');

describe('Schema.<type>.default', () => {
  test('Returns the provided default value for the given key', () => {
    const testData = { notTest: 1 };

    const validated = Schema.number.default(1)('test', testData);

    expect(validated).toBe(1);
  });

  test('Returns value for provided defaulter function for the given key', () => {
    const testData = { notTest: 1 };

    const validated = Schema.number.default(() => 1)('test', testData);

    expect(validated).toBe(1);
  });

  test('Returns error if default value does not match schema type', () => {
    const testData = { notTest: 1 };

    const validated = Schema.number.default('string')('test', testData);

    expect(validated).toBeInstanceOf(TypeError);
    expect(validated).toMatchSnapshot();
  });
});
