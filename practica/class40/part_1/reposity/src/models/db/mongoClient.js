const mongosee = require("mongoose");
const Config = require("../config/config");

// creo confi coneccion mediante clases
class MymongoClient {
  constructor() {
    (this.conected = false), (this.client = mongosee);
  }

  async conect() {
    try {
      await this.client.connect(Config.host + Config.name);
      console.log("Base de datos conectada!");
    } catch (error) {
      throw "Error al conectar a la DB";
    }
  }

  async disconect() {
    try {
      await this.client.close();
      console.log("Base de datos desconectada!");
    } catch (error) {
      throw "Error al desconectar  la DB";
    }
  }
}

module.exports = MymongoClient;
