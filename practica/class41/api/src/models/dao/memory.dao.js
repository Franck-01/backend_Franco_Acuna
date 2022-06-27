class MemoryDao {
  constructor() {
    this.elements = [];
  }

  listAll() {
    return [...this.elements];
  }

  listById(id) {
    const user = this.elements.find((item) => {
      return item.id == id;
    });
    if (!user) {
      throw "Error al listar usuario: Elemento no encontrado!";
    }
    return user;
  }

  save(elem) {
    let newId;
    if (this.elements.length == 0) {
      newId = 1;
    } else {
      newId = this.elements[this.elements.length - 1].id + 1;
    }

    const newElem = { ...elem, id: newId };
    this.elements.push(newElem);
  }
}

module.exports = MemoryDao;
