const Product = require("../product/productSchema");
const Addition = require("./additionalSchema")

exports.addService=async(req,res)=>{
    let {name}=req.body
    try {
        const exist=await Addition.findOne({name})
        console.log(exist);
        
        if(exist){
            return res.status(400).send({
                msg: "Service already exists",
                exist
            })
        }else{
            let data=await Addition(req.body)
            await data.save()
            res.status(200).send({
                msg:"Service added successfully",
                data
            })
        }
    } catch (error) {
        res.status(400).send({
            error,message:error.message
        })
    }
}

exports.getService=async(req,res)=>{
    let { page } = req.query;
  try {
    if (page) {
      let data = await Addition.find()
        .skip((page - 1) * 12)
        .limit(12);
      res.status(200).send({
        msg: "Service successfully retrieved",
        data,
      });
    } else {
      let data = await Addition.find()
      res.status(200).send({
        msg: "Service successfully retrieved",
        data,
      });
    }
  } catch (error) {
    res.status(400).send({
      msg: error.message,
      error,
    });
  }
}
exports.getServiceDetails = async (req, res) => {
    let {id}=req.params
    try {
      let data = await Addition.findById(id)
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
exports.editService=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await Addition.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).send({
            message: "Service successfully updated",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg: error.message,
            error,
        });
    }
}

exports.deleteService = async (req, res) => {
    let {id}=req.params
    try {
      let data = await Addition.findByIdAndDelete(id);
      let DeletedService=await Product.updateMany({},{$pull:{service:id}})

      res.status(200).send({
        msg: " Service successfully Deleted",
        data,
      });
    } catch (error) {
      res.status(400).send({
        msg: error.message,
        error,
      });
    }
  };

