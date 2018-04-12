const { ObjectId } = require('mongodb');
const Db = require('./Db');
const Utils = require('./Utils');

class Document {
  static collection() {
    try {
      const db = Db.db();
      return db.collection(this.collectionName());
    } catch (e) {
      console.error(e);
    }
  }

  static convertToClass(data, schema = this.schema()) {
    const instance = new this();

    if ('_id' in data) {
      instance.id = Utils.idToString(data._id);
    }

    Object.keys(schema).forEach((key) => {
      const val = data[key];

      if (val instanceof ObjectId) {
        instance[key] = Utils.idToString(val);

        return;
      }

      if (Array.isArray(val) && val[0] instanceof ObjectId) {
        instance[key] = Utils.idsToString(val);
        return;
      }

      instance[key] = data[key];
    });

    return instance;
  }

  static async create(data) {
    const schema = this.schema();
    const errors = [];

    const createData = {};

    for (let key in schema) {
      const val = schema[key](key, data);

      if (val instanceof Error) {
        errors.push(val);
      } else {
        createData[key] = schema[key](key, data);
      }
    }

    if (errors.length > 0) {
      throw errors;
    }

    const insertResult = await this.collection().insertOne(createData);

    if (!insertResult.result.ok) {
      throw err;
    }

    const { insertedId } = insertResult;

    return await this.find(insertedId);
  }

  static async find(query, options = {}) {
    let _query;

    if (Array.isArray(query)) {
      _query = { _id: { $in: Utils.toObjectIds(query) } };
    } else {
      _query = query;
    }

    try {
      const data = await this.collection()
        .find(_query, options)
        .toArray();

      const instances = data.map((d) => this.convertToClass(d));

      return instances;
    } catch (e) {
      console.error(e);
    }
  }

  static async findOne(query) {
    let _query;

    if (Utils.isId(query)) {
      _query = { _id: Utils.toObjectId(query) };
    } else {
      _query = query;
    }

    try {
      const data = await this.collection().findOne(_query);
      const schema = this.schema();

      if (!data) return null;

      const inst = this.convertToClass(data, schema);

      return inst;
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Document;
