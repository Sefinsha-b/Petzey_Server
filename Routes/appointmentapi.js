const express = require('express');
const router = express.Router();
const APPOINTMENT=require('../models/AppointmentMData')





// Create a new Vets
router.post('/Appointment', async (req, res) => {
    const { PetName,Department,VetName,MoreDetails } = req.body;

    try {
        const AppointmentDB = new APPOINTMENT({PetName,Department,VetName,MoreDetails});
        await AppointmentDB.save();
        res.status(201).json(AppointmentDB);
    } catch (error) {
        res.status(400).json({ message: 'Error creating Appointment' });
    }
});


// Get all Vets
router.get('/Appointment', async (req, res) => {
    try {
        const appoIntment = await APPOINTMENT.find();
        res.json(appoIntment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Appointment' });
    }
});


// Get all Vets

router.put('/Appointment/:id', async (req, res) => {
    const AppoiId = req.params.id;
    const updatedData = req.body; // Assuming your request body contains the updated data

    try {
        const updatedappoi = await APPOINTMENT.findOneAndUpdate(
            { _id: AppoiId },
            { $set: updatedData },
            { new: true }
        );

        if (updatedappoi) {
            res.json(updatedappoi);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating Appointment' });
    }
});






module.exports = router;
