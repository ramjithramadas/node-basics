const http = require("http");
const { routes, text } = require("./routes");

// fs.rmdir(path.join(__dirname, "api"), {}, (err) => {
//    if (err) throw err;
// });

console.log(text, "test");

const server = http.createServer(routes);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log("server is running..."));
