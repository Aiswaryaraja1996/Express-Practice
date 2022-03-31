const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200);
    res.end("Welcome to Home Page");
  }
  if (req.method === "GET" && req.url === "/users") {
    fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, data) => {
      if (err) throw err;
      res.writeHead(200);
      res.end(data);
    });
  }
  if (req.method === "GET" && req.url.startsWith("/users/")) {
    const index = req.url.split("/")[2];
    fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, data) => {
      if (err) throw err;
      const user = JSON.parse(data)[index - 1];
      res.writeHead(200, { contentType: "application/json" });

      res.end(JSON.stringify(user));
    });
  }
});

server.listen(3000, () => {
  console.log("Listening on port 3000...");
});
