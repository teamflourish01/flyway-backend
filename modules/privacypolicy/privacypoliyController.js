const privacyModel = require("./privacypolicySchema");

exports.addpolicy = async (req, res) => {
  try {
    const newPrivacypolicy = new privacyModel({ ...req.body });
    const data = await newPrivacypolicy.save();
    res.status(201).json({ msg: "Add Succesfuly", data });
  } catch (error) {
    console.error("Not Add Privacy Policey", error);
    res.status(500).json({ msg: error.message, error });
  }
};

exports.getData = async (req, res) => {
  try {
    let data = await privacyModel.find({});
    res.status(200).json({ msg: "Prvacy Poliecy Fetch Successful", data });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
      error,
    });
  }
};

exports.getSingleData = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await privacyModel.findById(id);
    res.status(200).json({ msg: "Privacy policy Fetch Single Data", data });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
      error,
    });
  }
};
exports.editPolicy = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedPolicy = await privacyModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPolicy) {
      return res.status(404).json({ msg: "Policy not found" });
    }

    res.status(200).json({ msg: "Edit Successful", data: updatedPolicy });
  } catch (error) {
    console.error("Error editing Privacy Policy", error);
    res.status(500).json({ msg: error.message, error });
  }
};