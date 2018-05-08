const Db = require('../src/Db');
const { Collection } = require('mongodb');

const uri = global.__MONGODB_URI__;
const name = global.__MONGODB_NAME__;

describe('Db', () => {
  describe('not connected', () => {
    test('.db throws error if not connected', () => {
      expect(() => Db.db()).toThrowError();
    });
  });

  test('.init returns an instance of Db', async () => {
    const instance = await Db.init({ uri, name });

    expect(instance).toBeInstanceOf(Db);
  });

  test('.isConnected returns true when connected', async () => {
    const instance = await Db.init({ uri, name });

    expect(instance.isConnected()).toBeTruthy();
  });

  test('.collection returns a Colleciton', async () => {
    const instance = await Db.init({ uri, name });

    expect(instance.collection('__test__')).toBeInstanceOf(Collection);
  });
});
