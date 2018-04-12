const { MongoClient } = require('mongodb');

class Db {
  constructor(connection, database, uri, name) {
    this.connection = connection;
    this.database = database;
    this.uri = uri;
    this.name = name;
  }

  isConnected() {
    return this.connection.isConnected(this.name);
  }

  collection(collectionName) {
    if (!this.isConnected()) {
      throw new Error('There is no connection to a mongodb right now');
    }

    return this.database.collection(collectionName);
  }

  static async init({ uri, name }) {
    if (
      this.instance &&
      this.instance.connection &&
      this.instance.connection.isConnected(name)
    ) {
      return Db.instance;
    }

    try {
      const connection = await MongoClient.connect(uri);
      const database = connection.db(name);

      this.instance = new Db(connection, database, uri, name);

      return this.instance;
    } catch (e) {
      console.error('BALLS', e);
    }
  }

  static db() {
    if (!this.instance) {
      throw new Error('Db has not been initialized yet');
    }
    // const db = await Db.init();

    return this.instance;
  }
}

module.exports = Db;
