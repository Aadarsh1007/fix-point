var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/usersRoutes");

// to check connection require file in app js // update new comment
require("./config/dbconnection");

var app = express();

// view engine setup
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/FIXPOINT FRONT"),
  path.join(__dirname, "views/FIXPOINT FRONT/FILES"),
  path.join(__dirname, "views/FIXPOINT FRONT/Files/img"),
  path.join(__dirname, "views/FIXPOINT FRONT/FILES/BLOG"),
  path.join(__dirname, "views/FIXPOINT FRONT/FILES/ABOUT"),
  path.join(__dirname, "views/FIXPOINT FRONT/FILES/SUPPORT"),
  path.join(__dirname, "views/EV OWNER/2wheel"),
  path.join(__dirname, "views/EV OWNER/3wheel"),
  path.join(__dirname, "views/EV OWNER/4wheel"),
  path.join(__dirname, "views/2NDEVOWNER/2wheelbulk"),
  path.join(__dirname, "views/2NDEVOWNER/2wheelbulk/ABOUT"),
  path.join(__dirname, "views/2NDEVOWNER/2wheelbulk/SUPPORT"),

  path.join(__dirname, "views/FIXPOINT FRONT/FILES/services"),
  path.join(__dirname, "views/2NDEVOWNER/3wheelbulk"),
  path.join(__dirname, "views/2NDEVOWNER/3wheelbulk/ABOUT"),
  path.join(__dirname, "views/2NDEVOWNER/3wheelbulk/SUPPORT"),
  
  path.join(__dirname, "views/2NDEVOWNER/4wheelbulk"),
  path.join(__dirname, "views/2NDEVOWNER/4wheelbulk/ABOUT"),
  path.join(__dirname, "views/2NDEVOWNER/4wheelbulk/SUPPORT"),


  path.join(__dirname, "views/EV MANUFACTURE"),
  path.join(__dirname, "views/EV MANUFACTURE/ABOUT"),
  path.join(__dirname, "views/EV MANUFACTURE/SUPPORT"),


  path.join(__dirname, "views/GOVERNMENTBODY/govtwheel"),
  path.join(__dirname, "views/GOVERNMENTBODY/govtwheel/ABOUT"),
  path.join(__dirname, "views/GOVERNMENTBODY/govtwheel/SUPPORT"),




  
]);

app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views/FIXPOINT FRONT")));
app.use(express.static(path.join(__dirname, "views/FIXPOINT FRONT/FILES")));
app.use(express.static(path.join(__dirname, "views/FIXPOINT FRONT/FILES/img")));
app.use(express.static(path.join(__dirname, "views/EV OWNER")));
app.use(express.static(path.join(__dirname, "views/")));

app.use("/index", indexRouter);
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
