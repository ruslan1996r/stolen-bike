const express = require("express");
const router = express.Router();
const { Policeman } = require("../models/policeman")

// Register a policeman
router.post('/policeman', async (req, res) => {
    const policeman = await new Policeman({ name: req.body.name }).save()
    res.json({ policeman })
})

// Get all policemans
router.get('/policemans', async (req, res) => {
    const policemans = await Policeman.find().populate("bicycle")
    res.json({ policemans })
})


module.exports = router