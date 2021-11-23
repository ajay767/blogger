const express = require("express");
const blogController = require("./../controller/blogController");
const authCOntroller = require("./../controller/authController");
const router = express.Router();

router.route("/").get(blogController.getAllBlogs);
router.route("/:id").get(blogController.getBlog);
router.use(authCOntroller.protect);

router.route("/").post(blogController.createBlog);

router
  .route("/:id")
  .delete(blogController.deleteBlog)
  .put(blogController.updateBlog);

module.exports = router;
