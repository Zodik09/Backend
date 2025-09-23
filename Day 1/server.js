// http is a module, so it already installed along with the installition of the node.js, so it is not required to install it explicitly.
const http = require("http");

const server = http.createServer((req, res) => {
    res.end("<h1>Chanda Rani</h1>");
});
server.listen(3000, () => {
    console.log("Server is running on port 3000...");
});
