const { Category } = require("./categorySchema");

exports.addCategory = async (req, res) => {
  try {
    let exist = await Category.findOne({ name: req.body.name });
    if (exist) {
    return  res.status(400).send({
        msg: "Category already exists",
        exist,
      });
    } else {
      let data = new Category(req.body);
      await data.save();
      res.status(200).send({
        msg: "Category successfully Added",
        data,
      });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.getCategory = async (req, res) => {
  let { page } = req.query;
  try {
    if (page) {
      let data = await Category.find()
        .skip((page - 1) * 12)
        .limit(12);
      res.status(200).send({
        msg: "Category successfully retrieved",
        data,
      });
    } else {
      let data = await Category.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "products",
          },
        },

      ]);
      res.status(200).send({
        msg: "Category successfully retrieved",
        data,
      });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.getSingleCategory = async (req, res) => {
  let { slug } = req.params;
  try {
    let data = await Category.aggregate([
      {$match:{slug}},
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
    ]);
    res.status(200).send({
      msg: "Category successfully retrieved",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.editCategory = async (req, res) => {
  let { slug } = req.params;

  try {
    let data = await Category.findOneAndUpdate({ slug }, req.body, {
      new: true,
    });
    res.status(200).send({
      msg: "Category successfully Updated",
      data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteCategory = async (req, res) => {
  let { slug } = req.params;
  try {
    let data = await Category.findOneAndDelete({ slug });
    let remaining = await Category.find({}, {}, { sort: { order: 1 } });

    for (let i = 0; i < remaining.length; i++) {
      remaining[i].order = i + 1;
      await remaining[i].save();
    }
    res.status(200).send({
      msg: "Category successfully Deleted",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.searchCategory = async (req, res) => {
  let { search } = req.params;
  try {
    let data = await Category.find({
      name: { $regex: `^${search}`, $options: "i" },
    });
    res.status(200).send({
      msg: "Search category successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};
