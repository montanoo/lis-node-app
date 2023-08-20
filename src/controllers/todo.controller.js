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
  async create(todo) {
    return new Promise((resolve) => {
      let createdArticle = {
        id: data.length + 1,
        ...todo,
      };

      resolve(createdArticle);
    });
  }
  async update(id) {
    return new Promise((resolve, reject) => {
      let article = data.find((artic) => artic.id == id);
      if (!article) {
        reject("No article found with that id.");
      }
      article["title"] = "Edited this title";
      resolve(article);
    });
  }
  async delete(id) {
    return new Promise((resolve, reject) => {
      let article = data.find((artic) => artic.id == id);
      if (!article) {
        reject("No article found with that id.");
      }
      resolve("Article deleted");
    });
  }
}

module.exports = TodoController;
