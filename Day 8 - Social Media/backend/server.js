const app = require("./src/app");
const connectToDB = require("./src/db/db");
require("@dotenvx/dotenvx").config();

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
