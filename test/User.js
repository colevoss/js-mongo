const { ObjectId } = require('mongodb');
const Schema = require('../src/Schema');
const Db = require('../src/Db');
const Document = require('../src/Document');

const uri = 'mongodb://localhost:27017';
const name = 'jsmongo-test';
// const name = 'adio';

class Group extends Document {
  static collectionName() {
    return 'groups';
  }

  // static schema() {
  //   return new Schema({
  //     name: String,
  //     userIds: [ObjectId],
  //     projectIds: [ObjectId],
  //   });
  // }
}

class User extends Document {
  static collectionName() {
    return 'users';
  }

  static schema() {
    return {
      firstName: Schema.string,
      testId: Schema.id,
      // test: Schema.object,
      // lastName: MTypes.string.isRequired,
      // test: MTypes.enum('test', 'hello', 'hi').isRequired,
      // updatedAt: Schema.date.default(() => new Date()),
      // idk: Schema.arrayOf(Schema.string).required,
      // createdAt: Date,
      // email: String,
      // verified: Boolean,
      // groupIds: [ObjectId],
    };
    // return new Schema({
    //   firstName: String,
    //   lastName: String,
    //   updatedAt: Date,
    //   createdAt: Date,
    //   email: String,
    //   verified: Boolean,
    //   groupIds: [ObjectId],
    // });
  }

  async groups() {
    return await Group.find(this.groupIds);
  }
}

// Db.init({ uri, name }).then(() => {
//   User.create({
//     firstName: 'hello',
//     testId: 'ballll',
//   })
//     .then(console.log)
//     .catch(console.error);
// });

Db.init({ uri, name })
  .then(() => {
    // User.findOne('5aa6e9160dca2821c39bb131');
    User.findOne('5aa6e9160dca2821c39bb131').then((u) => {
      console.log(u);
      // u.groups().then(console.log);
    });
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
  .catch(console.error);
