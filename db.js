let mongodb = require('mongodb');

class Database {
  static connect(){
    return mongodb.MongoClient.connect('mongodb://dbuser:password@ds161901.mlab.com:61901/exeter').then((db) => {
      console.log('db connected');
      this.db = db;
    })
  }

  constructor(db) { }
}

module.exports = Database;
