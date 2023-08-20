const data = require("../data/articles.data");

class TodoController {
  async index() {
    return new Promise((resolve) => resolve(data));
  }
  async show(id) {
    return new Promise((resolve, reject) => {
      let article = data.find((artic) => artic.id == id);
      if (article) {
        return resolve(article);
      }
      return reject();
    });
  }
}

module.exports = TodoController;
