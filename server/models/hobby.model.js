const mongoose = require('mongoose');


const hobbySchema = new mongoose.Schema({
    title:String, 
    description:String
})

module.exports = mongoose.model("Hobby", hobbySchema);