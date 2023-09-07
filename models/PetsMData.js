const mongoose = require('mongoose');


const PetSchema = new mongoose.Schema({

    FirstName:String,
    Age:Number,
    OwnerEmail: String,
    Gender:String


})

module.exports =mongoose.model('pets',PetSchema);