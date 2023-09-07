const express = require('express');
const router = express.Router();
const DEPARTMENT=require('../models/DepartmentmData');








// Create a new Vets
router.post('/Department', async (req, res) => {
    const { DepartmentName,Description,Active,Inactive } = req.body;

    try {
        const DepartmentDB = new DEPARTMENT({DepartmentName,Description,Active,Inactive});
        await DepartmentDB.save();
        res.status(201).json(DepartmentDB);
    } catch (error) {
        res.status(400).json({ message: 'Error creating Appointment' });
    }
});


// Get all Vets
router.get('/Department', async (req, res) => {
    try {
        const DEpartment = await DEPARTMENT.find();
        res.json(DEpartment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Appointment' });
    }
});


// Get all Vets

router.put('/Department/:id', async (req, res) => {
    const departId = req.params.id;
    const updatedData = req.body; // Assuming your request body contains the updated data

    try {
        const updatedDepart = await DEPARTMENT.findOneAndUpdate(
            { _id: departId },
            { $set: updatedData },
            { new: true }
        );

        if (updatedDepart) {
            res.json(updatedDepart);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating Appointment' });
    }
});






module.exports = router;
