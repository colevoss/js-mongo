const { ObjectId } = require('mongodb');
const SubDocument = require('./SubDocument');
const Utils = require('./Utils');

class BaseDocument {
  static schema() {
    throw new Error('You need to override the static `schema` method!');
  }

  // static transformValueForSchema(val, schemaType) {
  //   if (Array.isArray(schemaType.__type)) {
  //     return val.map((v) =>
  //       this.transformValueForSchema(v, schemaType.__type[0]),
  //     );
  //   }

  //   if (schemaType.__type.prototype instanceof SubDocument) {
  //     return this.convertData(
  //       val,
  //       schemaType.__type.schema(),
  //       new schemaType.__type(),
  //     );
  //   }

  //   switch (schemaType._type) {
  //     case 'id':
  //       return Utils.idToString(val);

  //     case 'shape':
  //       return this.convertData(val, schemaType, {});

  //     default:
  //       return val;
  //   }
  // }

  // static convertData(data, schema = this.schema.schema, acc) {
  //   const instance = acc || new this();

  //   if ('_id' in data) {
  //     instance.id = Utils.idToString(data._id);
  //     instance._id = data._id;
  //   }

  //   return Object.keys(schema).reduce((res, key) => {
  //     const val = data[key];
  //     const schemaVal = schema[key];

  //     res[key] = this.transformValueForSchema(val, schemaVal);

  //     return res;
  //   }, instance);
  // }

  // static validate(data, schema, allowMissing = false) {
  //   const errors = [];
  //   const validatedData = {};

  //   for (let key in schema) {
  //     if (allowMissing && !data.hasOwnProperty(key)) continue;

  //     const val = schema[key](key, data);

  //     if (val instanceof Error) {
  //       errors.push(val);
  //     } else {
  //       validatedData[key] = val;
  //     }
  //   }

  //   if (errors.length > 0) {
  //     throw errors;
  //   }

  //   if (data._id) {
  //     validatedData._id = data._id;
  //   }

  //   return validatedData;
  // }
}

module.exports = BaseDocument;
