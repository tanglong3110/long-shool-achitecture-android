const mongoose = require('mongoose');

const ClassDetailShema  = new mongoose.Schema({
    idClass: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "class"
    },
    idStudent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "student"
    }
})

module.exports = ClassDetail = mongoose.model("class_detail", ClassDetailShema)