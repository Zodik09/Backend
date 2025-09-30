const app = require("./src/app");
const connectToDB = require("./src/db/db");
const songsModel = require("./src/models/songs.model");
require("@dotenvx/dotenvx").config();

connectToDB();
songsModel();

const port = 3000;

app.listen(3000, () => {
    console.log("Server is running on port " + port + "...");

})