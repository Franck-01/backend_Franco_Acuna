let instance = null;

class SingletonClass {
  constructor() {
    this.value = Math.random(100);
  }

  //   Creamos metodo estatico
  static getInstance() {
    if (!instance) {
      instance = new SingletonClass();
    }

    return instance;
  }
}

module.exports = SingletonClass;
