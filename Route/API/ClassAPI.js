const express = require("express");
const {check, validationResult} = require("express-validator");
const route = express.Router();


// const Class = require("./../../Models/ClassModel");
const ClassModel = require("./../../Models/ClassModel");

//Create class
route.post("/createClass", [
    check('nameClass', "Please, enter name of class ! ").not().isEmpty()
],async(req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors : err.array()})
    }
    const {nameClass} = req.body;
    try {
        let class_model = await ClassModel.findOne({nameClass});
        if(class_model){
            return res.status(400).json({error:  "Name of class is already exist !!"});
        }

        class_model = new ClassModel({
            nameClass
        })

        await class_model.save();
        return res.status(200).json(class_model) 
        
    } catch (error) {
        return res.status(500).send("Server error")
    }
})

//Get all class
route.get("/allClass", async(req, res)=>{
    try {
        await ClassModel.find()
        .then(docs => {
            if(docs <= 0){
                return res.status(200).json({result: "Null class"})
            }
            return res.status(200).json(docs);
        })
    } catch (error) {
        return res.status(400).send("Server error")
    }
})


//Get class By id
route.get("/classInfo/:idClass", async(req, res)=>{
    var idClass = req.params.idClass
    try {
        await ClassModel.findOne({_id: idClass})
        .then(doc => {
            if(doc <= 0){
                return res.status(200).json({result: "Null class"})
            }
            return res.status(200).json(doc);
        })
    } catch (error) {
        return res.status(400).send("Server error")
    }
})

//Delete class by id Class
route.get("/deleteClass/:idClass", async(req, res) => {
    var idClass = req.params.idClass

    try {
        var classModel= await ClassModel.findOne({_id : idClass})
        if(!classModel){
            return res.status(404).json({result : "Class not found ! "})
        }
        else{
            await ClassModel.findByIdAndRemove({_id : idClass})
            return res.status(200).send("Delete success ! ")
        }

    } catch (error) {
        return res.status(400).send("Server error")
    }

})


//Update class by id Class
route.post("/updateClassById", async(req, res) => {
    var {_id, nameClass} = req.body

    try {
        var classModel= await ClassModel.findOne({_id})
        if(!classModel){
            return res.status(404).json({result : "Class not found ! "})
        }
        else{

            var classM = {
                nameClass
            }
            await ClassModel.findByIdAndUpdate({_id},
                classM)
            return res.status(200).send("Update success ! ")
        }

    } catch (error) {
        return res.status(400).send("Server error")
    }

})

module.exports = route;