const mongoose = require("mongoose")
const { Schema } = mongoose

const bicycleSchema = new Schema({
    description: {
        type: String,
        default: "My bike was stolen"
    },
    status: {
        type: String,
        enum: ['STOLEN', 'SEARCH', 'FOUND'],
        default: "STOLEN"
    },
})

const Bicycle = mongoose.model("Bicycle", bicycleSchema)

module.exports = { Bicycle }