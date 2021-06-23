const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./backend/routes/router');


const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "client")));

app.set("views", __dirname + "/client/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");


app.use(
  session({
    secret: "SessionSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: null,
    },
  })
);

app.use("/", routes);

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log("App listening on port ", app.get("port"));
});

module.exports = app;