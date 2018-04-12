const { ObjectId } = require('mongodb');
const Db = require('./src/Db');

const uri = 'mongodb://localhost:27017';
const name = 'adio';

Db.init({ uri, name }).then((db) => console.log(db.isConnected()));
// console.log(ObjectId.isValid('5aa6e9160dca2821c39bb'));
// 5aa6e9160dca2821c39bb131
