const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use("/users", require("./services/users.service"));
app.use("/vehicles", require("./services/vehicles.service"));
app.use("/", (req, res) => {
  return res.send("Hello! from carcheck backend Node JS API");
});
// start server
const port = 3000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
