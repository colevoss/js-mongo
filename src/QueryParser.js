const { ObjectId } = require('mongodb');
const Utils = require('./Utils');

class QueryParser {
  static parse(query, defaultQuery = {}) {
    if (Utils.isId(query)) {
      return this.combineDefaultQuery(this.plainIdQuery(query), defaultQuery);
    }

    if (Array.isArray(query) && query.every(Utils.isId)) {
      return this.combineDefaultQuery(this.plainIdInQuery(query), defaultQuery);
    }

    return this.combineDefaultQuery(query, defaultQuery);
  }

  static combineDefaultQuery(query, defaultQuery) {
    return {
      ...defaultQuery,
      ...query,
    };
  }

  static plainIdQuery(id) {
    return {
      _id: Utils.toObjectId(id),
    };
  }

  static plainIdInQuery(ids) {
    return {
      _id: {
        $in: Utils.toObjectIds(ids),
      },
    };
  }
}

module.exports = QueryParser;
