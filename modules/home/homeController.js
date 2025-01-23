const Home = require("./homeSchema");

exports.addHome=async(req,res)=>{
    try {
        let data=await Home(req.body)
        await data.save()
        res.status(200).send({
            data,
            message:"Page added successfully"
        })
    } catch (error) {
        res.status(error.code).send({
            error,
            message:error.message
        })
    }
}

exports.editHome=async(req,res)=>{
    let {id}=req.params
    try {
        let data=await Home.findByIdAndUpdate(id,req.body,{new:true})
        await data.save()
        res.status(200).send({
            data,
            message:"Page added successfully"
        })
    } catch (error) {
        res.status(error.code).send({
            error,
            message:error.message
        })
    }
}

exports.getHome=async(req,res)=>{
    try {
        let data=await Home.find()
        res.status(200).send(({
            data,
            message:"Data retrived successfully"
        }))
    } catch (error) {
        res.status(400).send({
            error,
            message:error.message
        })
    }
}
