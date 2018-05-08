const { MongoClient } = require('mongodb');
const path = require('path');
const EJ = require('mongodb-extended-json');

class Seed {
  constructor(db, uri, dbName) {
    this.db = db;
    this.callCount = 0;
  }

  static async init(uri, dbName) {
    const connection = await MongoClient.connect(uri);

    const db = connection.db(dbName);

    return new Seed(db);
  }

  async seedTest() {
    await this.db.createCollection('__test__');
  }
}

module.exports = Seed;
