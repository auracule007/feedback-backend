const express = require("express");
const mongoose = require("mongoose");
const debug = require("debug")("app:startapp");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const logger = require("./middlewares/logger");
const uploads = require("./middlewares/upload");
const feedback = require("./routes/feedback");
const register = require("./routes/register");
const signin = require("./routes/signin");
const app = express();
const cors = require("cors");

// Database connection
mongoose
  .connect("mongodb+srv://pogooluwa12:2BFtIguWhKoTpZ3J@cluster0.nxsousf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  // .connect("mongodb://127.0.0.1:27017/feedbackDB")
  .then(() => console.log("Connected to FeedbackDB"))
  .catch((err) => console.error("Error connecting to FeedbackDB", err));

// Pc7PNjENUI9B6lzN
// middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(logger);
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Debugging");
}
app.use(
  cors({
    origin: "https://feedback-app-sandy-nine.vercel.app/",
    // origin: "http://localhost:3000",
    allowedHeaders: ["Authorization", "Content-Type", "x-auth-token"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Configurations
console.log(`Application name: ${config.get("name")}`);
console.log(`Application Server: ${config.get("mail.host")}`);
// 2BFtIguWhKoTpZ3J

// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL: token is not defined..");
//   process.exit(1);
// }

//Routes
app.use("/api/feedback", feedback);
app.use("/api/register", register);
app.use("/api/signin", signin);

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", uploads, (req, res) => {
  res.send("Images upload");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running Port ${port}..`));

// .connect("mongodb+srv://pogooluwa12:2BFtIguWhKoTpZ3J@cluster0.nxsousf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
