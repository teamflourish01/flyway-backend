const Product = require("./productSchema");
exports.getProduct = async (req, res) => {
  let { page } = req.query;
  try {
    if (page) {
      let data = await Product.find()
        .skip((page - 1) * 12)
        .limit(12)
        .populate(["category","service","price"]);
      res.status(200).send({
        msg: "Product retrieved successfully",
        data,
      });
    } else {
      let data = await Product.find().populate(["category","service","price"]);
      res.status(200).send({
        msg: "Product retrieved successfully",
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

exports.addProduct = async (req, res) => {
  let { name } = req.body;
  try {
    console.log(req.body,"body");

    // let image = file?.image?.map((e) => e?.filename);
    let dup = JSON.parse(req.body?.dup) || {}; 
    let obj=dup
      obj.image=req.files["image"]?.map((e) => e?.filename)||[];
    console.log(obj.image,"image");
    
    // let exist = await Product.findOne({ name });
    // if (exist) {
    //   res.status(400).send({
    //     msg: "Product already exists",
    //     exist,
    //   });
    // } else {
      console.log(obj,"obj");
      
      let data = new Product({ ...obj});
      await data.save();
      res.status(200).send({
        msg: "Product saved successfully",
        data,
      });
    // }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.searchProduct = async (req, res) => {
  let { search } = req.params;
  try {
    let data = await Product.find({
      name: { $regex: `^${search}`, $options: `i` },
    }).populate("category");
    res.status(200).send({
      msg: "Searched Product Retrived",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  let { slug } = req.params;

  try {
    let data = await Product.findOneAndDelete({ slug });
    let id = data?._id;
    // let homeDeletedProduct = await HomeModel.updateMany(
    //   {},
    //   { $pull: { top_product: slug, our_products: slug } }
    // );
    console.log(data);
    res.status(200).send({
      msg: "Product deleted successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.getDetailProduct = async (req, res) => {
  let { slug } = req.params;
  try {
    let data = await Product.findOne({ slug }).populate([,"service","price"]);
    res.status(200).send({
      msg: "Single Product Retrived",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.editProduct = async (req, res) => {
  let { slug } = req.params;
  try {
    console.log("body data", JSON.parse(req.body.dup));
    let dup = JSON.parse(req.body.dup);
    let files = req.files;
    console.log(files, "files");
    let product = files["image"]?.map((e) => e.filename);
    console.log(product,"product");
    if (product) {
      dup.image = [...dup.image, ...product];
    }
  console.log(dup.image,"image");

    let data = await Product.findOneAndUpdate(
      { slug },
      { ...dup },
      { new: true }
    );
    console.log(data);
    res.status(200).send({
      msg: "Product updated successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};
