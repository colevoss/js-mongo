const MongodbMemoryServer = require('mongodb-memory-server');
const Seed = require('../seed/Seed');

const MONGODB_NAME = '--js-mongo-test--';
const MONGODB_PORT = 27018;

const mongod =
  global.__MONGOD__ ||
  new MongodbMemoryServer.default({
    instance: {
      port: MONGODB_PORT,
      dbName: MONGODB_NAME,
    },
  });

module.exports = async function globalSetup() {
  if (!!global.__MONGOD__) {
    await global.__MONGOD__.start();
  } else {
    global.__MONGOD__ = mongod;
  }

  const uri = await mongod.getConnectionString();

  const seed = await Seed.init(uri, MONGODB_NAME);

  await seed.seedTest();

  // await seed.seedUsers();
  // await seed.seedGroups();

  global.__MONGODB_NAME__ = MONGODB_NAME;
};

// const MongodbMemorySever = require('mongodb-memory-server');

// const MONGODB_NAME = '--js-mongo-test--';
// const MONGODB_PORT = 27018;

// const mongod =
//   global.__MONGOD__ ||
//   new MongodbMemorySever.default({
//     instance: {
//       port: MONGODB_PORT,
//       dbName: MONGODB_NAME,
//     },
//   });

// module.exports = async function globalSetup() {
//   if (global.__MONGOD__) {
//     await global.__MONGOD__.start();
//   } else {
//     global.__MONGOD__ = mongod;
//   }

//   console.log(global);

//   // const uri = await mongod.getConnectionString();

//   global.__MONGODB_NAME__ = MONGODB_NAME;
// };
