const Schema = require('./Schema');
const schemaGenerators = require('./schemaGenerators');

Schema.string = schemaGenerators.createPrimitiveValitator('string');
Schema.number = schemaGenerators.createPrimitiveValitator('number');
Schema.date = schemaGenerators.createPrimitiveValitator('date');
Schema.boolean = schemaGenerators.createPrimitiveValitator('boolean');
Schema.array = schemaGenerators.createPrimitiveValitator('array');
Schema.object = schemaGenerators.createPrimitiveValitator('object');

Schema.enum = schemaGenerators.createEnumValidator;
Schema.shape = schemaGenerators.createShapeValidator;
Schema.arrayOf = schemaGenerators.createArrayOfTypeValidator;
Schema.id = schemaGenerators.createIdValidator();
Schema.subDocument = schemaGenerators.createSubDocumentValidator;

module.exports = Schema;
