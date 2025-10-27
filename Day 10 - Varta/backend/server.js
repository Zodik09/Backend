const app = require("./src/app");
const connectToDB = require("./src/db/db");
require("@dotenvx/dotenvx").config();
const port = 3000;
const initSocketServer = require("./src/sockets/socket.service");
const httpServer = require("http").createServer(app);

connectToDB();

initSocketServer(httpServer);

httpServer.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
