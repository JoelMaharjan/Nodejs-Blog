const express = require("express");
//morgan
const morgan = require("morgan");

const mongoose = require("mongoose");

const Blog = require("./module/blog");
//express app
const app = express();

//connect to mongodb

const dbURI =
  "mongodb+srv://joelmaharjan:Joel621303@cluster0.wsrmjmj.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to mongodb"))
  .catch((err) => err);

//listening for request
app.set("view engine", "ejs");
app.listen(3000);

app.use(morgan("dev"));

//static & public files

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find().then((result) => {
    res.render('index', {title:"All Blogs", blogs: result});
  }).catch((err)=>{
    console.log(err)
  })
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create A blog" });
});

//redirect
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

//404 page
app.use((req, res) => {
  res.status(404).render("404");
});
