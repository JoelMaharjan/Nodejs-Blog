const express = require("express");
//morgan
const morgan = require("morgan");

//express app
const app = express();


const mongoose = require("mongoose");

const Blog = require("./module/blog");

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

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create A blog" });
});

app.get("/blogs", (req, res) => {
  Blog.find().sort({createdAt:-1})
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog details ", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});




//404 page
app.use((req, res) => {
  res.status(404).render("404");
});
