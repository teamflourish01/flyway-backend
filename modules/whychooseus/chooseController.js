const Choose = require("./chooseSchema")

exports.addChoose=async(req,res)=>{
    try {
        console.log(req.file);
        let image=req.file?.filename || ""

        let data=await Choose({...req.body,image} )
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

exports.editChoose=async(req,res)=>{
    let {id}=req.params
    let dup={...req.body}
    if(req.file.filename){
        dup={...req.body,image:req.file.filename}
    }
    try {
        let data=await Choose.findByIdAndUpdate(id,dup,{new:true})
        res.status(200).send({
            data,
            message:"Item Edited successfully"
        })
    } catch (error) {
        res.status(error.code).send({
            error,
            message:error.message
        })
    }
}

exports.getChoose=async(req,res)=>{
    try {
        let data=await Choose.find()
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

exports.getChooseDetail=async(req,res)=>{
    try {
        let {id}=req.params
        let data=await Choose.findById(id)
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
exports.deleteChoose=async(req,res)=>{
    try {
        let {id}=req.params
        let data=await Choose.findByIdAndDelete(id)
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


