const Schema = require('../../src/Schema');
const { ObjectId } = require('mongodb');

describe('Schema.id', () => {
  test('Returns an ObjectId for valid id string or ObjectId', () => {
    const testData = { test: '5acebe0610348ab07dde7672' };
    const oTestData = { test: new ObjectId() };

    expect(Schema.id('test', testData).toHexString()).toBe(testData.test);

    expect(Schema.id('test', oTestData).toHexString()).toBe(
      oTestData.test.toHexString(),
    );
  });

  test('Returns error', () => {
    const testData = { test: 'INVALID ID' };

    const checked = Schema.id('test', testData);

    expect(checked).toBeInstanceOf(TypeError);
    expect(checked).toMatchSnapshot();
  });

  test('__type', () => {
    expect(Schema.id.__type).toBe('id');
  });
});
