const { ObjectId } = require('mongodb');
const BaseDocument = require('./BaseDocument');
const Db = require('./Db');
const Utils = require('./Utils');
const QueryParser = require('./QueryParser');

class Document {
  static collection() {
    try {
      const db = Db.db();
      return db.collection(this.collectionName());
    } catch (e) {
      console.error(e);
    }
  }

  static defaultFindQuery() {
    return {};
  }

  static async create(data) {
    const createData = this.schema.validate(data);

    const insertResult = await this.collection().insertOne(createData);

    if (!insertResult.result.ok) {
      throw err;
    }

    const { insertedId } = insertResult;

    return await this.find(insertedId);
  }

  static async find(query, options) {
    const _query = QueryParser.parse(query, this.defaultFindQuery());

    try {
      const data = await this.collection()
        .find(_query, options)
        .toArray();

      return data.map((d) => this.schema.convertData(d, new this()));
    } catch (e) {
      console.error(e);
    }
  }

  static async findOne(query, options) {
    const _query = QueryParser.parse(query, this.defaultFindQuery());

    try {
      const data = await this.collection().findOne(_query);

      if (!data) return null;

      return this.schema.convertData(data, new this());
    } catch (e) {
      console.error(e);
    }
  }

  static async count(query, options) {
    const _query = QueryParser.parse(query, this.defaultFindQuery());

    try {
      return await this.collection().count(_query, options);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Document;
