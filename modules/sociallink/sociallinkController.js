const sociallinkModel = require("./socialSchema");

exports.getContectDetails = async (req, res) => {
  try {
    let data = await sociallinkModel.find();
    res.status(200).json({ msg: "Contect Details get suucessfuly", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};

exports.addContectdetail = async (req, res) => {
  try {
    const contectDetails = new sociallinkModel(req.body);
    const data = await contectDetails.save();
    res.status(200).json({ msg: "sociallinkModel Add successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "sociallinkModel Not Add", error });
  }
};

exports.getContectdetailsByid = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await sociallinkModel.findById(id);
    res.status(200).send({ msg: "Single sociallinkModel received", data });
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
};
exports.updateContectdetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { updateContect } = req.body;

    const exist = await sociallinkModel.findById(id);
    if (!exist) {
      return res.status(404).json({ error: "sociallinkModel not found" });
    }
    const data = await sociallinkModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ msg: "Update Successfuly", data });
  } catch (error) {
    res.status(400).json({ error: "sociallinkModel Update Faild", error });
  }
};
