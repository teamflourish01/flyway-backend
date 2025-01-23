const Choose = require("./chooseSchema")

exports.addChoose=async(req,res)=>{
    try {
        let data=await Choose(req.body)
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
    try {
        let data=await Choose.findByIdAndUpdate(id,req.body,{new:true})
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


