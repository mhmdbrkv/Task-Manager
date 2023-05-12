const homeRoutes = require('./routes/home-routes');
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(express.static(path.join(__dirname, "assets")));

app.set("view engine", "ejs");

app.use('/', homeRoutes);

app.listen(3000, () => console.log("done http://localhost:3000"));
