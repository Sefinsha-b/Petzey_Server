const express = require('express');
const router = express.Router();
const DUmmyyM=require('../models/dummymData');





// Create a new Vets
router.post('/dummyin', async (req, res) => {
    const { Name,Password,Passport } = req.body;

    try {
        const DummyDB = new DUmmyyM({Name,Password,Passport });
        await DummyDB.save();
        res.status(201).json(DummyDB);
    } catch (error) {
        res.status(400).json({ message: 'Error creating dummypage' });
    }
});


// Get all Vets
router.get('/dummyin', async (req, res) => {
    try {
        const dummydb = await DUmmyyM.find();
        res.json(dummydb);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dummypage' });
    }
});


// Get all Vets

router.put('/dummyin/:id', async (req, res) => {
    const dummyId = req.params.id;
    const updatedData = req.body; // Assuming your request body contains the updated data

    try {
        const updatedvets = await DUmmyyM.findOneAndUpdate(
            { _id: dummyId },
            { $set: updatedData },
            { new: true }
        );

        if (updatedvets) {
            res.json(updatedvets);
        } else {
            res.status(404).json({ message: 'dummypage not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating Vetpage' });
    }
});



// Delete a Vet by ID
router.delete('/dummyin/:id', async (req, res) => {
    const dummyId = req.params.id;

    try {
        const deleteddummy = await DUmmyyM.findOneAndRemove({ _id: dummyId });

        if (deleteddummy) {
            res.json({ message: 'dummypage deleted successfully' });
        } else {
            res.status(404).json({ message: 'dummypage not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting dummypage' });
    }
});

// Delete a Vet by ID




module.exports = router;
