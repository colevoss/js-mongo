const _ = require('lodash');
const Utils = require('./Utils');

const primitiveCheckers = {
  array: _.isArray,
  number: _.isNumber,
  string: _.isString,
  boolean: _.isBoolean,
  date: _.isDate,
  object: _.isPlainObject,
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

const createChainableValidator = (validator) => {
  const chainable = (isRequired, defaultVal, key, obj) => {
    const val = obj[key];
    if (val == null) {
      if (isRequired) {
        return new TypeError(`${key} is required but recieved ${val}`);
      }

      if (defaultVal) {
        obj[key] = _.isFunction(defaultVal) ? defaultVal() : defaultVal;

        return validator(key, obj);
      }

      return val;
    }

    return validator(key, obj);
  };

  const chained = chainable.bind(null, false, undefined);
  chained.required = chainable.bind(null, true, undefined);
  chained.default = (defaultVal) => chainable.bind(null, false, defaultVal);

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

  return createChainableValidator(validator);
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

  return createChainableValidator(validator);
};

const createSubDocumentValidor = (shape) => {
  const validator = (key, obj) => {
    const val = obj[key];

    if (!_.isPlainObject(val)) {
      return new TypeError(
        `Expected a subdocument for ${key} but recieved ${val}`,
      );
    }

    const errors = [];

    for (let key in shape) {
      const keyValidator = shape[key];

      const checkedVal = keyValidator(key, val);

      if (checkedVal instanceof Error) {
        errors.push(checkedVal);
      }
    }

    if (errors.length > 0) return Error(errors);

    return val;
  };

  return createChainableValidator(validator);
};

const createArrayOfTypeValidator = (checker) => {
  const validator = (key, obj) => {
    const val = obj[key];
    const errors = [];

    if (!_.isArray(val)) {
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

  return createChainableValidator(validator);
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

  return createChainableValidator(validator);
};

module.exports = {
  string: createPrimitiveValitator('string'),
  number: createPrimitiveValitator('number'),
  date: createPrimitiveValitator('date'),
  boolean: createPrimitiveValitator('boolean'),
  array: createPrimitiveValitator('array'),
  object: createPrimitiveValitator('object'),

  enum: createEnumValidator,
  subDoc: createSubDocumentValidor,
  arrayOf: createArrayOfTypeValidator,
  id: createIdValidator(),
};
