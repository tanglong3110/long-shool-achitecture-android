const mongoose = require('mongoose');

const StudentShema = new mongoose.Schema({
    nameStudent: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required : true,
        unique: true
    },
    gender:{
        type: String,
        required: true
    },
    birthDay:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
    }
});
  module.exports = Student = mongoose.model("student", StudentShema)