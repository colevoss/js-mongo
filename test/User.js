// const { ObjectId } = require('mongodb');
// const Schema = require('../src/Schema');
const Db = require('../src/Db');
const Document = require('../src/Document');
// const SubDocument = require('../src/SubDocument');
const Schema = require('../src/Schema');

const uri = 'mongodb://localhost:27017';
const name = 'jsmongo-test';
// // const name = 'adio';

// class Group extends Document {
//   static collectionName() {
//     return 'groups';
//   }

//   // static schema() {
//   //   return new Schema({
//   //     name: String,
//   //     userIds: [ObjectId],
//   //     projectIds: [ObjectId],
//   //   });
//   // }
// }

// class UserSubDoc extends SubDocument {
//   static schema() {
//     return {
//       // _id: Schema.id,
//       someKey: Schema.string,
//       someOtherKey: Schema.number.required,
//     };
//   }
// }

class User extends Document {
  static collectionName() {
    return 'users';
  }

  static defaultFindQuery() {
    return {
      active: true,
    };
  }

  // async groups() {
  //   return await Group.find(this.groupIds);
  // }
}

User.schema = new Schema({
  firstName: Schema.string,
  createdAt: Schema.date.default(() => new Date()),
  updatedAt: Schema.date.default(() => new Date()),
  active: Schema.boolean.default(true),
});

// User.schema = userSchema;

// Db.init({ uri, name }).then(() => {
//   User.create({
//     firstName: 'hello',
//   })
//     .then(console.log)
//     // const validate = require('./validate');
//     .catch(console.error);
// });

Db.init({ uri, name })
  .then(() => {
    // User.findOne('5aa6e9160dca2821c39bb131');
    // User.findOne('5aa6e9160dca2821c39bb131').then((u) => {
    return User.find({ firstName: 'hello' }).then((u) => {
      console.log(u);
      // console.log(u.subDoc[0]);
      // u.groups().then(console.log);
    });
    // return User.count().then((c) => console.log('COUNT', c));
    // User.findOne({ firstName: 'Test' }).then((u) => {
    //   console.log(u);
    //   // u.groups().then(console.log);
    // });
    // User.find(['5aa6e9160dca2821c39bb131', '5acc22e7df0b78e75d59ad59']).then(
    //   (users) => {
    //     console.log(users);
    //   },
    // );
  })
  .then(() => process.exit())
  .catch(console.error);
