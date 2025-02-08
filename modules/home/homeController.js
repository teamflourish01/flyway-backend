const Home = require("./homeSchema");

exports.addHome = async (req, res) => {
  try {
    let data = await Home(req.body);
    await data.save();
    res.status(200).send({
      data,
      message: "Page added successfully",
    });
  } catch (error) {
    res.status(error.code).send({
      error,
      message: error.message,
    });
  }
};

exports.editHome = async (req, res) => {
  let { id } = req.params;
  try {
    let dup = JSON.parse(req.body.dup) || {};
    console.log(req.files.banner_image, "banner image");
    let banner_image = req.files["banner_image"]?.map((e) => e?.filename);
    let gallery = req.files["gallery"]?.map((e) => e?.filename);

    if (banner_image) {
      dup.banner_image = [...dup.banner_image, ...banner_image];
    }
    if (gallery) {
      dup.gallery = [...dup.gallery, ...gallery];
    }
    let data = await Home.findByIdAndUpdate(id, { ...dup }, { new: true });
    console.log(data, "data");
    res.status(200).send({
      data,
      message: "Page added successfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};

exports.getHome = async (req, res) => {
  try {
    let data = await Home.find();
    res.status(200).send({
      data,
      message: "Data retrived successfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      message: error.message,
    });
  }
};

exports.getHomeSingle = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  
  try {
    let data = await Home.findOne({"_id":id}).populate(["best_seller","new_arrival"])
    res.status(200).json({ msg: "Single Home item get", data });
  } catch (error) {
    res.status(400).json({
      msg: "Couldn't Get Single Home",
      error,
    });
  }
};
