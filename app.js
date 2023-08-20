const http = require("http");
const Articles = require("./src/controllers/todo.controller");

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
    const id = req.url.split("/")[3];
    const article = await new Articles().show(id);
    res.writeHead(200);
    res.end(JSON.stringify(article));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
