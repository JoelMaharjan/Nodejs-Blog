const express = require("express");
//morgan
const morgan = require("morgan");

//express app
const app = express();
const mongoose = require("mongoose");
const blogRoutes= require('./routes/blogRoutes')

//connect to mongodb

const dbURI =
  "mongodb+srv://joelmaharjan:Joel621303@cluster0.wsrmjmj.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) => console.log("connected to mongodb"))
  .catch((err) => err);

//listening for request
app.set("view engine", "ejs");
app.listen(3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//static & public files
app.use(express.static("public"));



//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use(blogRoutes)

//404 page
app.use((req, res) => {
  res.status(404).render("404");
});
