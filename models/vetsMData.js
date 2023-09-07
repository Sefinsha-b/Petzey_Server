const mongoose = require('mongoose');


const vetSchema = new mongoose.Schema({

    Name:String,
    Speciality:String,
    Address: String


})

module.exports =mongoose.model('vets',vetSchema);