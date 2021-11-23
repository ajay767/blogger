const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { parseCookie } = require("./../utils");

exports.protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "please login to continue" });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

exports.protectView = async (req, res, next) => {
  try {
    const token = parseCookie(req.headers.cookie)?.jwt;

    if (!token) {
      return res.redirect("/admin/login");
    }
    console.log(token);
    await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/admin/login");
  }
};

exports.login = async = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ status: false, message: "email or password incorrect" });
  }

  if (email !== process.env.EMAIL || password !== process.env.PASSWORD) {
    return res
      .status(401)
      .json({ status: false, message: "email or password is incorrect" });
  }
  console.log(email);
  const token = jwt.sign({ email, password }, process.env.JWT_SECRET);

  res.cookie("jwt", token, { secure: true, path: "/" });

  res.status(200).json({ status: true, token });
};
