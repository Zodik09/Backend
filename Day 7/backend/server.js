const app = require("./src/app");
const connectToDB = require("./src/db/db")
require("@dotenvx/dotenvx").config();
const port = 3000;
connectToDB();

app.listen(port,()=>{
    console.log("Server is running on port " + port + "...");
})