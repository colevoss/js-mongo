const Utils = require('./Utils');

class SubDocument {
  static schema() {
    throw new Error('You need to override the static `schema` method!');
  }

  static create(data) {
    return {
      _id: Utils.toObjectId(),
      ...data,
    };
  }
}

module.exports = SubDocument;
