const {
  isArray,
  isNumber,
  isString,
  isBoolean,
  isDate,
  isPlainObject,
  isFunction,
} = require('lodash');
const Utils = require('../Utils');
const SubDocument = require('../SubDocument');

class Schema {
  constructor(schema) {
    this.schema = schema;
  }

  validate(data, allowMissing = false) {
    return Schema.validate(data, this.schema, allowMissing);
  }

  static validate(data, schema, allowMissing = false) {
    const errors = [];
    const validatedData = {};

    for (let key in schema) {
      if (allowMissing && !data.hasOwnProperty(key)) continue;

      const val = schema[key](key, data);

      if (val instanceof Error) {
        errors.push(val);
      } else {
        validatedData[key] = val;
      }
    }

    if (errors.length > 0) {
      throw errors;
    }

    if (data._id) {
      validatedData._id = data._id;
    }

    return validatedData;
  }

  convertData(data, acc) {
    const instance = acc;

    if ('_id' in data) {
      instance.id = Utils.idToString(data._id);
      instance._id = data._id;
    }

    return Object.keys(this.schema).reduce((res, key) => {
      const val = data[key];
      const schemaVal = this.schema[key];

      res[key] = this.transformValueForSchema(val, schemaVal);

      return res;
    }, instance);
  }

  transformValueForSchema(val, schemaType) {
    if (Array.isArray(schemaType.__type)) {
      return val.map((v) =>
        this.transformValueForSchema(v, schemaType.__type[0]),
      );
    }

    if (schemaType.__type.prototype instanceof SubDocument) {
      return this.convertData(
        val,
        schemaType.__type.schema(),
        new schemaType.__type(),
      );
    }

    switch (schemaType._type) {
      case 'id':
        return Utils.idToString(val);

      case 'shape':
        return this.convertData(val, schemaType, {});

      default:
        return val;
    }
  }
}

module.exports = Schema;
