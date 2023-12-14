const express = require("express");

//express app
const app = express();

//listening for request
app.set("view engine", "ejs");
app.listen(3000);

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Hope",
      snippet: "hope is hope",
    },
    {
      title: "Hope",
      snippet: "hope is hope",
    },
    {
      title: "Hope",
      snippet: "hope is hope",
    },
  ];
  res.render("index", {title:"Home", blogs});
});

app.get("/about", (req, res) => {
  res.render("about",{title:"About"}, );
});
app.get("/create", (req, res) => {
  res.render("create",{title:"Create A blog"});
});

//redirect
app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

//404 page
app.use((req, res) => {
  res.status(404).render("404");
});
