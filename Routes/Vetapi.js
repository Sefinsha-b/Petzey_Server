const express = require('express');
const cors = require('cors');
const router = express.Router();
const VETS=require('../models/vetsMData')

// Create a new Vets
router.post('/vet_in', async (req, res) => {
    const { Name,Speciality,Address } = req.body;

    try {
        const VetDB = new VETS({Name,Speciality,Address });
        await VetDB.save();
        res.status(201).json(VetDB);
    } catch (error) {
        res.status(400).json({ message: 'Error creating Vetpage' });
    }
});


// Get all Vets
router.get('/vet_in', async (req, res) => {
    try {
        const Vets = await VETS.find();
        res.json(Vets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Vetpage' });
    }
});


// Get all Vets

router.put('/vet_in/:id', async (req, res) => {
    const vetId = req.params.id;
    const updatedData = req.body; // Assuming your request body contains the updated data

    try {
        const updatedvets = await VETS.findOneAndUpdate(
            { _id: vetId },
            { $set: updatedData },
            { new: true }
        );

        if (updatedvets) {
            res.json(updatedvets);
        } else {
            res.status(404).json({ message: 'Vetpage not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating Vetpage' });
    }
});



// Delete a Vet by ID
router.delete('/vet_in/:id', async (req, res) => {
    const vetId = req.params.id;

    try {
        const deletedVet = await VETS.findOneAndRemove({ _id: vetId });

        if (deletedVet) {
            res.json({ message: 'Vetpage deleted successfully' });
        } else {
            res.status(404).json({ message: 'Vetpage not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Vetpage' });
    }
});

// Delete a Vet by ID
// Delete a Vet by ID




module.exports = router;
