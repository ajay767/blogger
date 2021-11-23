const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const blogRoute = require("./routes/blogRoutes");
const viewRoute = require("./routes/viewRoutes");
const upload = require("./utils/multer");
const cloudinary = require("./utils/cloudinary");
const authRoute = require("./routes/authRoute");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.use("/", viewRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blog", blogRoute);
app.post("/api/v1/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file.path) {
      return next(new AppError("No file found", 404));
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    res.status(201).json({
      status: "success",
      location: result.secure_url,
      id: result.public_id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: "Something bad happened!" });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
