const AboutusModel = require("./aboutSchema");

exports.add = async (req, res) => {
  try {
    const newAboutus = new AboutusModel({
      ...req.body,
      banner: req.files?.banner ? req.files.banner[0].path : undefined,
      banner_two: req.files?.banner_two
        ? req.files.banner_two[0].path
        : undefined,
    });

    const savedAboutus = await newAboutus.save();

    res.status(201).json({
      message: "About Us data added successfully!",
      data: savedAboutus,
    });
  } catch (error) {
    console.error("Error adding About Us data:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

exports.getData = async (req, res) => {
  try {
    let data = await AboutusModel.find({});
    res.status(200).json({ msg: "Aboutus data get successfuly", data });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
      error,
    });
  }
};
exports.getSingleData = async (req, res) => {
  const id = req.params.id;
  try {
    let data = await AboutusModel.findById(id);
    res.status(200).json({ msg: "Aboutus data get Single successfuly", data });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
      error,
    });
  }
};
function handleSingleImage(newFile, currentImage) {
  return newFile?.[0]?.filename || currentImage;
}
// exports.editCard = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const existingData = await AboutusModel.findById(id);
//     if (!existingData) {
//       return res.status(404).json({ error: "Aboutus existing Data not found" });
//     }

//     // Handle single image (e.g., 'img' field)
//     const banner = handleSingleImage(req.files?.banner, existingData.banner);
//     const banner_two = handleSingleImage(
//       req.files?.banner_two,
//       existingData.banner_two
//     );

//     // Prepare updated fields with body data and updated image fields
//     const updatedFields = {
//       ...req.body,
//       banner,
//       banner_two,
//     };
//     // Update the data in the database
//     const updatedData = await AboutusModel.findByIdAndUpdate(
//       id,
//       updatedFields,
//       {
//         new: true,
//       }
//     );

//     res
//       .status(201)
//       .json({ msg: "About updated successfully", data: updatedData });
//   } catch (error) {
//     res.status(500).json({ error: "Data not updated", message: error.message });
//   }
// };
exports.editAboutus = async (req, res) => {
  let { id } = req.params;
  try {
    let dup = JSON.parse(req.body.dup);
    let files = req.files;    
    if (files.banner) {
      const bnrIMG = files.banner[0].filename;
      dup.banner = bnrIMG;
    }
    if (files.banner_two) {
      const bnrtwoIMG = files.banner_two[0].filename;
      dup.banner_two = bnrtwoIMG;
    }
    if (req.body.ourjouerney) {
      dup.ourjouerney = JSON.parse(req.body.ourjouerney);
    }
    let data = await AboutusModel.findByIdAndUpdate(
      id,
      { ...dup },
      { new: true }
    );
    res.status(201).send({ msg: "About us Data Update Successfuly", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};