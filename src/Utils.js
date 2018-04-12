const { ObjectId } = require('mongodb');

class Utils {
  static isId(id) {
    const isString = typeof id === 'string';
    const isObjectId = id instanceof ObjectId;

    // if (isString || isObjectId) return true;

    return (isString || isObjectId) && ObjectId.isValid(id);
  }

  static toObjectId(id) {
    if (id == null) return new ObjectId();

    return new ObjectId(id);
  }

  static toObjectIds(ids) {
    return ids.map(this.toObjectId);
  }

  static idToString(id) {
    if (typeof id === 'string') return id;

    return id.toHexString();
  }

  static idsToString(ids) {
    return ids.map(this.idToString);
  }
}

module.exports = Utils;
