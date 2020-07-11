const express = require("express");
const route = express.Router();


const ClassDetailModel = require("./../../Models/ClassDetailModel");


function findTodo (myTodo, iclass , istudent){
    const result  = myTodo.filter(object => object.idClass == iclass && object.idStudent == istudent)
    return result;
}

// Class detail
route.post("/createClassDetail",async(req, res)=>{
    const {idClass , idStudent} = req.body
    try {
        await ClassDetailModel.find()
        .then(async docs => {
            if(docs.length > 0){
                var cldetail = findTodo(docs, idClass, idStudent)
                if(cldetail.length > 0){
                    return res.status(400).send("Student is already existed in class ! ")
                }
                else{
                    let classDetail = new ClassDetailModel({
                        idClass,
                        idStudent
                    })
                    await classDetail.save()
                    return res.status(200).json(classDetail)
                }
            }
            else{
                let classDetail = new ClassDetailModel({
                    idClass,
                    idStudent
                })
                await classDetail.save()
                return res.status(200).json(classDetail)
            }
        })
        . catch (error=> {
        return res.status(500).send(error.message)
    })
    } catch (error) {
        return res.status(500).send("Server error")
    }
       
})

route.get("/getClasss/:idClass", async(req, res) => {
    var idClass = req.params.idClass
    try {
        await ClassDetailModel.find({idClass})
        .exec()
        .then(docs => {
            if(docs <= 0){
                return res.status(200).json({result: "Null class"})
            }
            else{
                return res.status(200).json(docs);
            }
        })
    } catch (error) {
        return res.status(400).send("Server error")
    }
})


route.get("/getStudents/:idStudent", async(req, res) => {
    var idStudent = req.params.idStudent
    try {
        await ClassDetailModel.find({idStudent})
        .exec()
        .then(docs => {
            if(docs <= 0){
                return res.status(200).json({result: "Null student"})
            }
            else{
                return res.status(200).json(docs);
            }
        })
    } catch (error) {
        return res.status(400).send("Server error")
    }
})


//Delete class_detail by id Class
route.get("/deleteClassDetail/:idClassDetail", async(req, res) => {
    var idClassDetail = req.params.idClassDetail

    try {
        var classDetailModel= await ClassDetailModel.findOne({_id : idClassDetail})
        if(!classDetailModel){
            return res.status(404).json({result : "Class detail not found ! "})
        }
        else{
            await ClassDetailModel.findByIdAndRemove({_id : idClassDetail})
            return res.status(200).send("Delete success ! ")
        }

    } catch (error) {
        return res.status(400).send("Server error")
    }

})

module.exports = route