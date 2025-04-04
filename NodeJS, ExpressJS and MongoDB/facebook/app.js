const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./configs/mongoose");
const controllerRoutes = require("./routes/controller-routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

connectDB();

app.use("/", controllerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
