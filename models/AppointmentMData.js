const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({

    PetName:String,
    Department:String,
    VetName: String,
    MoreDetails:String


})

module.exports =mongoose.model('APPOINTMENTS',appointmentSchema);