const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://talha:12345@nodepractice.ypalsyr.mongodb.net/node-practice?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.use("*", checkUser);

app.use(authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});
// app.get("/", (req, res) => res.render("index"));
app.use("/events", eventRoutes);

// app.get("/create", (req, res) => res.render("create"));

app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
