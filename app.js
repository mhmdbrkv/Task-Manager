const homeRoutes = require("./routes/home-routes");
const {connectDB} = require("./database/connect");
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const url =
  "mongodb+srv://barakamohamed946:usFIQky3jFVHLQ66@cluster0.7b1lli7.mongodb.net/Tasks?retryWrites=true&w=majority";

app.use(helmet());
app.use(express.static(path.join(__dirname, "assets")));

app.set("view engine", "ejs");

app.use("/", homeRoutes);

connectDB(url)
  .then(() => {
    app.listen(3000, () => console.log("done http://localhost:3000"));
  })
  .catch((err) => console.log(err));
