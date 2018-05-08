const NodeEnvironment = require('jest-environment-node');

class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    const mongod = global.__MONGOD__;

    this.global.__MONGODB_URI__ = await mongod.getConnectionString();
    this.global.__MONGODB_NAME__ = global.__MONGODB_NAME__;

    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
