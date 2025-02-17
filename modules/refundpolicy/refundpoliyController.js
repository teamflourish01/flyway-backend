const refundModel = require("./privacypolicySchema");

exports.addpolicy = async (req, res) => {
  try {
    const newPrivacypolicy = new refundModel({ ...req.body });
    const data = await newPrivacypolicy.save();
    res.status(201).json({ msg: "Add Succesfuly", data });
  } catch (error) {
    console.error("Not Add Refund Policey", error);
    res.status(500).json({ msg: error.message, error });
  }
};

exports.getData = async (req, res) => {
  try {
    let data = await refundModel.find({});
    res.status(200).json({ msg: "Refund Poliecy Fetch Successful", data });
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
    let data = await refundModel.findById(id);
    res.status(200).json({ msg: "Refund policy Fetch Single Data", data });
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
    const updatedPolicy = await refundModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPolicy) {
      return res.status(404).json({ msg: "Refund Policy not found" });
    }

    res.status(200).json({ msg: "Edit Successful", data: updatedPolicy });
  } catch (error) {
    console.error("Error editing Refund Policy", error);
    res.status(500).json({ msg: error.message, error });
  }
};