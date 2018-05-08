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
const Schema = require('./Schema');

const primitiveCheckers = {
  array: isArray,
  number: isNumber,
  string: isString,
  boolean: isBoolean,
  date: isDate,
  object: isPlainObject,
};

const createError = (key, expected, received, value) => {
  return new TypeError(
    `Expected ${key} to be of type ${expected} but recieved ${received} of ${value}`,
  );
};

const getPropType = (value) => {
  for (let key in primitiveCheckers) {
    const checker = primitiveCheckers[key];

    if (checker(value)) return key;
  }

  return typeof value;
};

const createChainableValidator = (validator, type) => {
  const chainable = (isRequired, defaultVal, key, obj) => {
    const val = obj[key];
    if (val == null) {
      if (isRequired) {
        return new TypeError(`${key} is required but recieved ${val}`);
      }

      if (defaultVal) {
        obj[key] = isFunction(defaultVal) ? defaultVal() : defaultVal;

        return validator(key, obj);
      }

      return val;
    }

    return validator(key, obj);
  };

  const chained = chainable.bind(null, false, undefined);
  chained.__type = type;

  chained.required = chainable.bind(null, true, undefined);
  chained.required.__type = type;

  chained.default = (defaultVal) => {
    const defaulter = chainable.bind(null, false, defaultVal);
    defaulter.__type = type;

    return defaulter;
  };

  return chained;
};

const createPrimitiveValitator = (expectedType) => {
  const validator = (key, obj) => {
    const val = obj[key];
    const valType = getPropType(val);

    if (valType !== expectedType) {
      return createError(key, expectedType, valType, val);
    }

    return val;
  };

  return createChainableValidator(validator, expectedType);
};

const createEnumValidator = (...types) => {
  const validator = (key, obj) => {
    const val = obj[key];

    if (types.includes(val)) {
      return val;
    }

    return new TypeError(
      `Expected one of ${JSON.stringify(types)} for ${key} but received ${val}`,
    );
  };

  return createChainableValidator(validator, 'enum');
};

const createShapeValidator = (shape) => {
  if (!isPlainObject(shape)) {
    throw new Error('Please provide a plain object to Schema.shape.');
  }

  const validator = (key, obj, schema) => {
    const val = obj[key];

    if (!isPlainObject(val)) {
      return new TypeError(
        `Expected a subdocument for ${key} but recieved ${val}`,
      );
    }

    try {
      const validated = Schema.validate(val, shape);
      return validated;
    } catch (errors) {
      return Error(errors);
    }
  };

  return createChainableValidator(validator, 'shape');
};

const createArrayOfTypeValidator = (checker) => {
  const validator = (key, obj) => {
    const val = obj[key];
    const errors = [];

    if (!isArray(val)) {
      return new TypeError(
        `Expected ${key} to be an array but received ${val}`,
      );
    }

    for (let i = 0; i < val.length; i++) {
      const checked = checker(i, val);

      if (checked instanceof Error) {
        errors.push(checked);
      }
    }

    if (errors.length > 0) return Error(errors);

    return val;
  };

  return createChainableValidator(validator, [checker]);
};

const createIdValidator = () => {
  const validator = (key, obj) => {
    const val = obj[key];

    if (!Utils.isId(val)) {
      return new TypeError(
        `Expected ${key} to be an valid ObjectId value but recieved ${val}`,
      );
    }

    return Utils.toObjectId(val);
  };

  return createChainableValidator(validator, 'id');
};

const createSubDocumentValidator = (subDocumentType) => {
  const validator = (key, obj) => {
    const val = obj[key];

    return subDocumentType.schema.validate(val);
  };

  return createChainableValidator(validator, subDocumentType);
};

module.exports = {
  createPrimitiveValitator,
  createEnumValidator,
  createShapeValidator,
  createArrayOfTypeValidator,
  createIdValidator,
  createSubDocumentValidator,
};
