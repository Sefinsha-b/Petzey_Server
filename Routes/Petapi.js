const express = require('express');
const router = express.Router();
const PETS=require('../models/PetsMData')






// Create a new Vets
router.post('/Pet_in', async (req, res) => {
    const { FirstName,Age,OwnerEmail,Gender } = req.body;

    try {
        const PETSDB = new PETS({ FirstName,Age,OwnerEmail,Gender });
        await PETSDB.save();
        res.status(201).json(PETSDB);
    } catch (error) {
        res.status(400).json({ message: 'Error creating PETS' });
    }
});


// Get all Vets
router.get('/Pet_in', async (req, res) => {
    try {
        const Pets = await PETS.find();
        res.json(Pets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching PETS' });
    }
});


// Get all Vets

router.put('/Pet_in/:id', async (req, res) => {  
    const petId = req.params.id;
    const updatedData = req.body; // Assuming your request body contains the updated data

    try {
        const updatedpets = await PETS.findOneAndUpdate(
            { _id: petId },
            { $set: updatedData },
            { new: true }
        );

        if (updatedpets) {
            res.json(updatedpets);
        } else {
            res.status(404).json({ message: 'PETS not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating PETS' });
    }
});


// Delete a Pet by ID
router.delete('/Pet_in/:id', async (req, res) => {
    const petId = req.params.id;

    try {
        const deletedPet = await PETS.findOneAndRemove({ _id: petId });

        if (deletedPet) {
            res.json({ message: 'Pet deleted successfully' });
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting pet' });
    }
});







module.exports = router;
