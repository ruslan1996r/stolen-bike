const express = require("express");
const router = express.Router();
const { Bicycle } = require("../models/bicycle")
const { Policeman } = require("../models/policeman")
const { isPolice } = require("../middleware/isPolice")

// Create new stolen bicycle
router.post("/", async (req, res) => {
    const newBicycle = await new Bicycle({ description: req.body.description }).save()
    res.json({ newBicycle })
})

// Get all bicycles
router.get("/", async (req, res) => {
    const bicycles = await Bicycle.find()
    res.json({ bicycles })
})

// Search bicycle
router.post('/search', async (req, res) => {
    const bicycle = await Bicycle.findOne({ status: 'STOLEN' })
    if (bicycle) {
        await Policeman.findOneAndUpdate({ _id: req.body.policeId }, { bicycle }, { new: true }, async (err, result) => {
            if (err) throw err
            await Bicycle.findOneAndUpdate({ _id: bicycle._id }, { status: "SEARCH" })
            res.json({ freePoliceman: result })
        }).populate('bicycle')
    } else {
        res.json({})
    }
})

// Update status by police
router.put('/', isPolice, async (req, res) => {
    const bikeId = req.body.bikeId

    await Bicycle.findOneAndUpdate({ _id: bikeId }, { status: 'FOUND' }, (err, res) => {
        if (err) throw err
    })
    await Policeman.findOneAndUpdate({ bicycle: bikeId }, { bicycle: null }, (err, police) => {
        if (err) throw err
        console.log(police, "police???")
        res.json({ policeId: police._id })
    })
})

module.exports = router