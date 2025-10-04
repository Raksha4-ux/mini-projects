
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let items = []; // store tasks as objects like { id, name, done }

app.get("/", (req, res) => {
  let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  let today = new Date();
  let day = today.toLocaleDateString("en-US", options);

  res.render("list.ejs", { day, items });
});

app.post("/", (req, res) => {
  const id = Date.now(); // unique ID for each task
  const item = { id, name: req.body.NewItem, done: false };
  items.push(item);
  res.redirect("/");
});

// toggle done/undone
app.post("/toggle/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (item) item.done = !item.done;
  res.redirect("/");
});

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.redirect("/");
});


app.listen(8080, () => {
  console.log("App is running on port 8080");
});
