const http = require("http");
const Articles = require("./src/controllers/todo.controller");
const { body } = require("./src/utils/utils.body");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/api/articles" && req.method === "GET") {
    const articles = await new Articles().index();
    res.writeHead(200);
    res.end(JSON.stringify(articles));
  }

  if (req.url.match(/\/api\/articles\/([0-9]+)/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[3];
      const article = await new Articles().show(id);
      res.writeHead(200);
      res.end(JSON.stringify(article));
    } catch (error) {
      res.writeHead(404);
      res.end(JSON.stringify(error));
    }
  }

  if (req.url === "/api/articles" && req.method === "POST") {
    try {
      let articleData = await body(req);
      let article = await new Articles().create(JSON.parse(articleData));

      res.writeHead(200, { "Content-Type": "application/json" });
      //send the todo
      res.end(JSON.stringify(article));
    } catch (error) {
      res.writeHead(422);
      res.end(JSON.stringify(error));
    }
  }

  if (req.url.match(/\/api\/articles\/([0-9]+)/) && req.method === "PATCH") {
    try {
      const id = req.url.split("/")[3];
      const article = await new Articles().update(id);
      res.writeHead(200);
      res.end(JSON.stringify(article));
    } catch (error) {
      res.writeHead(404);
      res.end(JSON.stringify(error));
    }
  }

  if (req.url.match(/\/api\/articles\/([0-9]+)/) && req.method === "DELETE") {
    try {
      const id = req.url.split("/")[3];
      const message = await new Articles().delete(id);
      res.writeHead(200);
      res.end(JSON.stringify(message));
    } catch (error) {
      res.writeHead(404);
      res.end(JSON.stringify(error));
    }
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
