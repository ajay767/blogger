const Blog = require("./../models/Blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ status: true, blogs, total: blogs.length });
  } catch (error) {
    res.status(400).json({ status: false, message: "Something bad happened!" });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const id = req.params.id;

    const blog = await Blog.findById(id);
    if (!blog) {
      res
        .status(404)
        .json({ status: false, message: "blog has been deleted!" });
    }

    res.status(200).json({ status: true, blog });
  } catch (error) {
    res.status(400).json({ status: false, message: "Something bad happened!" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, poster, body, description } = req.body;
    if (!title || !poster || !body || !description) {
      res.status(400).json({ status: false, message: "Invalid blog details" });
    }

    const blog = await Blog.create({ title, poster, body, description });

    res.status(201).json({ status: true, blog });
  } catch (error) {
    res.status(400).json({ status: false, message: "Something bad happened!" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, poster, body, description } = req.body;
    if (!title || !poster || !body || !description) {
      res.status(400).json({ status: false, message: "Invalid blog details" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
      title,
      poster,
      body,
      description,
    });

    res.status(204).json({ status: true, updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: "Something bad happened!" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.status(202).json({ status: true });
  } catch (error) {
    res.status(400).json({ status: false, message: "Something bad happened!" });
  }
};
