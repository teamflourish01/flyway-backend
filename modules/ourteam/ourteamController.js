const OurteamlModel = require("../ourteam/ourteamSchema");

exports.getAllTestimonials = async (req, res) => {
  let { page } = req.query;
  try {
    if (page) {
      let data = await OurteamlModel.find()
        .skip((page - 1) * 12)
        .limit(12);

      res.status(200).send({ msg: "OurTeam get successfuly", data });
    } else {
      let data = await OurteamlModel.find();
      res.status(200).send({ msg: "OurTeam recived successfuly", data });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.addTestimonials = async (req, res) => {
  try {
    const { name, designation, text } = req.body;
    const temlImage = req.file.filename;

    const newTestimonials = new OurteamlModel({
      name,
      designation,
      text,
      image: temlImage,
    });
    await newTestimonials.save();
    res
      .status(200)
      .json({ msg: "OurTeam add successfuly", data: newTestimonials });
  } catch (error) {
    res.status(400).json({ error: "OurTeam Not Add", error });
  }
};

exports.getTestimonialsById = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await OurteamlModel.findById(id);
    res.status(200).send({ msg: "Single OurTeam recived", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.deleteTestimonials = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await OurteamlModel.findByIdAndDelete(id);

    res.status(200).send({ msg: "OurTeam deleted successfully" });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    let singleImage;
    if (req.file) {
      singleImage = req.file.filename;
      req.body.image = singleImage;
    }
    const exist = await OurteamlModel.findById(id);
    if (!exist) {
      return res.status(404).json({ error: "OurTeam not found" });
    }

    const data = await OurteamlModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({ error: "Faild to update OurTeam" });
    }
    res.status(200).json({ msg: "Data Update successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "Internal server error", error });
  }
};
