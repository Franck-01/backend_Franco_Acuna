const MemoryDao = require("./dao/memory.dao");
const MongoDao = require("./dao/mongo.dao");

let persistencia = "memory";
let userDao;

switch (persistencia) {
  case "mongodb":
    userDao = new MongoDao();
    break;

  case "memory":
    userDao = new MemoryDao();
    break;
}

module.exports = { userDao };
