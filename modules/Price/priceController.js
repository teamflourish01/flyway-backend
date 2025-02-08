const Product = require("../product/productSchema")
const Price = require("./priceSchema")

exports.addPrice=async(req,res)=>{
    let {name}=req.body
    try {
        let exist=await Price.findOne({name})
        if(exist){
            return res.status(400).send({
                message:"Price Label Already Exist"
            })
        }
        let data=await Price(req.body)
            await data.save()
            res.status(200).send({
                data,
                message:"Price Label Saved successfully"
            })
    } catch (error) {
        res.status(400).send({
        error,
        message:error.message
        })
    }
}

exports.getPrice=async(req,res)=>{
  let { page } = req.query;

    try {
        if (page) {
            let data = await Price.find()
              .skip((page - 1) * 12)
              .limit(12);
            res.status(200).send({
              msg: "Category successfully retrieved",
              data,
            });
        }else{
            let data=await Price.find()
            res.status(200).send({
                data,
                message:"Price Label Archieved successfully"
            })
        }
    } catch (error) {
        res.status(400).send({
            error,
            message:error.message
            })
    }
}

exports.editPrice=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await Price.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send({
            message:"Price Updated successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            message:error.message,
            error
        })
    }
}

exports.deletePrice=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await Price.findByIdAndDelete(id)
        let homeDeletedProduct=await Product.updateMany({},{$pull:{price:id}})
        res.status(200).send({
            message:"Price Deleted successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            message:error.message,
            error
        })
    }
}

exports.getPriceDetail=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await Price.findByIdAndUpdate(id)
        res.status(200).send({
            message:"Price Details Retrived successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            error,
            message:error.message
            })
    }
}