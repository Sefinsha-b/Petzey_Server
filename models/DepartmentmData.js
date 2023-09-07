const mongoose = require('mongoose');


const departmentSchema = new mongoose.Schema({

    DepartmentName:String,
    Description:String,
    Active: String,
    Inactive:String


})

module.exports =mongoose.model('Departments',departmentSchema);