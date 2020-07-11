const mongoose = require('mongoose');

const ClassShema = new mongoose.Schema({
    nameClass: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = Class = mongoose.model("class", ClassShema)