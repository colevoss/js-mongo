const SubDocument = require('../../src/SubDocument');
const Schema = require('../../src/Schema');

const testDocSchema = new Schema({
  testString: Schema.string,
  testNumber: Schema.number,
});

class TestDoc extends SubDocument {
  // static schema() {
  //   return {
  //     testString: Schema.string,
  //     testNumber: Schema.number,
  //   };
  // }
}

TestDoc.schema = testDocSchema;

describe('Schema.subDocument', () => {
  test('Returns validated sub document data', () => {
    const testData = {
      test: TestDoc.create({ testString: 'string', testNumber: 1 }),
    };

    const validated = Schema.subDocument(TestDoc)('test', testData);

    expect(validated).toHaveProperty('testString', 'string');
    expect(validated).toHaveProperty('testNumber', 1);
  });

  test('Returns error', () => {
    const testData = {
      test: TestDoc.create({ testString: 1, testNumber: 'string' }),
    };

    const x = () => Schema.subDocument(TestDoc)('test', testData);

    expect(x).toThrowErrorMatchingSnapshot();
  });

  test('__type', () => {
    expect(Schema.subDocument(TestDoc).__type).toBe(TestDoc);
  });
});
