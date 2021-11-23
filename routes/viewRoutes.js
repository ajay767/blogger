const express = require("express");
const authController = require("./../controller/authController");
const viewController = require("./../controller/viewController");
const router = express.Router();

router.route("/").get(viewController.getHome);
router.route("/blog/:id").get(viewController.getBlog);
router.route("/admin/login").get(viewController.getLogin);

router
  .route("/admin")
  .get(authController.protectView, viewController.getAllBlog);
router
  .route("/admin/create")
  .get(authController.protectView, viewController.createBlog);
router
  .route("/admin/edit/:id")
  .get(authController.protectView, viewController.editBlog);

module.exports = router;
