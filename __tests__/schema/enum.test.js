const Schema = require('../../src/Schema');

describe('Schema.enum', () => {
  test('Returns valid option of the given enum', () => {
    const testData = { test: 'TEST' };

    expect(Schema.enum('TEST', 'OTHER_TEST')('test', testData)).toBe(
      testData.test,
    );
  });

  test('Returns error', () => {
    const testData = { test: 'NOT_TEST' };

    const checked = Schema.enum('TEST', 'OTHER_TEST')('test', testData);

    expect(checked).toBeInstanceOf(TypeError);
    expect(checked).toMatchSnapshot();
  });

  test('__type', () => {
    expect(Schema.enum('test', 'test 2').__type).toBe('enum');
  });
});
