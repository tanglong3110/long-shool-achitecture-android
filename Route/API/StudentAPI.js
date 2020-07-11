const express = require("express")
const {check, validationResult} = require("express-validator")
const route = express.Router()
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() +"_"+ file.fieldname +'.jpg');
    }
  });

var upload = multer({storage: storage});


const StudentModel = require("./../../Models/StudentModel");

// Create student
route.post("/createStudent",
    upload.single("avatar"), 
    [ check("nameStudent", "Please, enter name of student feild ! ").not().isEmpty(),
    check("phoneNumber", "Please, enter phone of student feild ! ").not().isEmpty(),
    check("address", "Please, enter address of student feild ! ").not().isEmpty(),
    check("gender", "Please, set gender for student ! ").not().isEmpty(),
    check("birthDay", "Please, set birthday for student ! ").not().isEmpty(),
    ] , 
    async(req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors : err.array()})
    }

    const avatar = req.file.path;
    const {nameStudent, phoneNumber, gender, birthDay, address} = req.body;
    try {
        let student = await StudentModel.findOne({nameStudent})
        if(student){
            return res.status(400).json({error:  "Name of student is already exist !"});
        }
        let phone = await Student.findOne({phoneNumber: phoneNumber})
        if(phone){
            return res.status(400).json({error:  "Phone number of student is already exist !"});
        }

        student = new StudentModel({
            nameStudent,
            phoneNumber,
            gender,
            birthDay,
            address,
            avatar
        })

        await student.save()
        return res.status(200).json(student);
    } catch (error) {
        return res.status(500).json({error : "Server error ! "});
    }
})

route.get("/allStudent", async(req, res)=>{
    try {
        await StudentModel.find()
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



route.get("/studentProfile/:idStudent", async(req, res) => {
    var idStudent = req.params.idStudent

    try {
        await StudentModel.findOne({_id : idStudent})
        .then(async doc => {
            return res.status(200).json(doc)
        }).catch(error => {
            return res.status(200).send(error)
        })
    } catch (error) {
        return res.status(400).send("Server error")
    }

})




// update Student By Id have AVATAR
route.post("/updateStudentByIdHaveAvatar",
    upload.single("avatar"), 
    [ check("nameStudent", "Please, enter name of student feild ! ").not().isEmpty(),
    check("phoneNumber", "Please, enter phone of student feild ! ").not().isEmpty(),
    check("address", "Please, enter address of student feild ! ").not().isEmpty(),
    check("gender", "Please, set gender for student ! ").not().isEmpty(),
    check("birthDay", "Please, set birthday for student ! ").not().isEmpty(),
    ] , 
    async(req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors : err.array()})
    }

    const avatar = req.file.path;
    const {idStudent, nameStudent, phoneNumber, gender, birthDay, address} = req.body;
    try {
       

       var student = {
            nameStudent,
            phoneNumber,
            gender,
            birthDay,
            address,
            avatar
       }

        await StudentModel.findByIdAndUpdate(
            {_id : idStudent},
            student)
            return res.status(200).json(student);
        
    } catch (error) {
        return res.status(500).json({error : "Server error ! "});
    }
})



// update Student By Id have not AVATAR
route.post("/updateStudentByIdNOTAvatar",
    [ check("nameStudent", "Please, enter name of student feild ! ").not().isEmpty(),
    check("phoneNumber", "Please, enter phone of student feild ! ").not().isEmpty(),
    check("address", "Please, enter address of student feild ! ").not().isEmpty(),
    check("gender", "Please, set gender for student ! ").not().isEmpty(),
    check("birthDay", "Please, set birthday for student ! ").not().isEmpty(),
    ] , 
    async(req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors : err.array()})
    }

    const {idStudent, nameStudent, phoneNumber, gender, birthDay, address} = req.body;
    try {
       

       var student = {
            nameStudent,
            phoneNumber,
            gender,
            birthDay,
            address,
       }

        await StudentModel.findByIdAndUpdate(
            {_id : idStudent},
            student)
            return res.status(200).json(student);
        
    } catch (error) {
        return res.status(500).json({error : "Server error ! "});
    }
})


//Delete student By id
route.get("/deleteStudent/:idStudent", async(req, res) => {
    var idStudent = req.params.idStudent

    try {
        var student = await StudentModel.findOne({_id : idStudent})
        if(!student){
            return res.status(404).json({result : "Student not found ! "})
        }
        else{
            await StudentModel.findByIdAndRemove({_id : idStudent})
            return res.status(200).send("Delete success ! ")
        }

    } catch (error) {
        return res.status(400).send("Server error")
    }

})


module.exports = route;