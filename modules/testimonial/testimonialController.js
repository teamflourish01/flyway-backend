const { Testimonial } = require("./testimonialSchema");

exports.addTestimonial=async(req,res)=>{
    try {
        let image=req.file?.filename || ""

        let data=await Testimonial({...req.body,image} )
        await data.save()
        res.status(200).send({
            data,
            message:"Item Added successfully"
        })
    } catch (error) {
        res.status(400).send({
            error,
            message:error.message
        })
    }
}

exports.editTestimonial=async(req,res)=>{
    let {id}=req.params
    let dup={...req.body}
    if(req.file.filename){
        dup={...req.body,image:req.file.filename}
    }
    try {
        let data=await Testimonial.findByIdAndUpdate(id,dup,{new:true})
        res.status(200).send({
            data,
            message:"Item Edited successfully"
        })
    } catch (error) {
        res.status(400).send({
            error,
            message:error.message
        })
    }
}

exports.getTestimonial=async(req,res)=>{
    try {
        let data=await Testimonial.find()
        res.status(200).send({
            data,
            message:"Items archieved Successfully"
        })
    } catch (error) {
        res.status(error.code).send({
            error,
            message:error.message
        })
    }
}

exports.getTestimonialDetails=async(req,res)=>{
    try {
        let {id}=req.params
        let data=await Testimonial.findById(id)
        res.status(200).send({
            data,
            message: "Data Archieved successfully"
        })
    } catch (error) {
        res.status(400).send({
            error,
            message:error.message
        })
    }
}
exports.deleteTestimonial=async(req,res)=>{
    try {
        let {id}=req.params
        let data=await Testimonial.findByIdAndDelete(id)
        res.status(200).send({
            data,
            message: "Data deleted successfully"
        })
    } catch (error) {
        res.status(400).send({
            error,
            message:error.message
        })
    }
}


