const Blog = require("./../models/Blog");
const momentjs = require("moment");

exports.getLogin = async (req, res) => {
  res.render("login");
};

exports.createBlog = (req, res) => {
  res.render("createBlog");
};

exports.editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.redirect("/admin/create");
    }

    res.render("editBlog", { blog });
  } catch (error) {
    console.log(error);
    res.render("login");
  }
};

exports.getAdminBlog = (req, res) => {
  res.render("create");
};

exports.getHome = async (req, res) => {
  const blogs = await Blog.find();
  const editedBlogs = blogs.map((el) => {
    return {
      _id: el._id,
      title: el.title,
      body: el.body,
      description: el.description,
      poster: el.poster,
      createdAt: momentjs(el.createdAt).format("Do MMM YY"),
    };
  });

  res.render("index", { blogs: editedBlogs });
};

exports.getAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.render("dashboard", { blogList: blogs });
  } catch (error) {
    console.log(error);
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    // blog.createdAt = momentjs(el.createdAt).format("Do MMM YY");
    res.render("blogPage", {
      blog: {
        _id: blog._id,
        title: blog.title,
        body: blog.body,
        description: blog.description,
        poster: blog.poster,
        createdAt: momentjs(blog.createdAt).format("Do MMM, YYYY"),
      },
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
