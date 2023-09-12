const mongoose = require ('mongoose');


const dummySchema = new mongoose.Schema({

    Name:String,
    Password:String,
    Passport: String

})

module.exports =mongoose.model('FaltTest',dummySchema);