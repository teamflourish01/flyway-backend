const BlogModel = require("./blogSchema");


exports.addBlog = async (req, res) => {
  let dup = JSON.parse(req.body.dup);
  if (req.files.banner) {
    dup.banner_image = req.files.banner[0].filename;
  }
  try {
    let { name, slug } = dup;
    let exist = await BlogModel.findOne({ $or: [{ name }, { slug }] });
    if (exist) {
      res.status(400).send({
        exist,
        msg: "Blog already exists",
      });
    } else {
      let data = await BlogModel({
        ...dup,
      });
      await data.save();
      res.status(200).send({
        msg: "Blog successfully Added",
        data,
      });
    }
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};

exports.getBlog = async (req, res) => {
  let { page } = req.query;
  try {
    if (page) {
      let data = await BlogModel.find()
        .skip((page - 1) * 12)
        .limit(12);
      res.status(200).send({
        msg: "Blog Retrived Successfully",
        data,
      });
    } else {
      let data = await BlogModel.find();
      res.status(200).send({
        msg: "Blog Retrived Successfully",
        data,
      });
    }
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};

exports.getDetailBlog = async (req, res) => {
  let { slug } = req.params;
  try {
    let data = await BlogModel.findOne({ slug });
    res.status(200).send({
      msg: "Data retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};

exports.editBlog = async (req, res) => {
  let { slug } = req.params;
  let dup = JSON.parse(req.body.dup);
  if (req.files.first) {
    dup.first_image = req.files.first[0].filename;
  }
  if (req.files.banner) {
    dup.banner_image = req.files.banner[0].filename;
  }
  if (req.files.second) {
    dup.second_image = req.files.second[0].filename;
  }
  if (req.files.third) {
    dup.third_image = req.files.third[0].filename;
  }
  try {
    let data = await BlogModel.findOneAndUpdate({ slug: slug }, dup, {
      new: true,
    });
    res.status(200).send({
      msg: "Blog Updated Successfully",
      data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteBlog = async (req, res) => {
  let { slug } = req.params;
  try {
    let data = await BlogModel.findOneAndDelete({ slug });
    res.status(200).send({
      msg: "Blog Deleted Successfully",
      data,
    });
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};

exports.searchBlog = async (req, res) => {
  let { search } = req.params;
  try {
    let data = await BlogModel.find({
      name: { $regex: `^${search}`, $options: `i` },
    });
    res.status(200).send({
      msg: "Blog Found Successfully",
      data,
    });
  } catch (error) {
    res.status(404).send({
      msg: error.message,
      error,
    });
  }
};
