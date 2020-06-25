const mongoose = require("mongoose")
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types

const policeSchema = new Schema({
    name: String,
    bicycle: {
        type: ObjectId,
        ref: "Bicycle",
        default: null
    }
})

const Policeman = mongoose.model("Policeman", policeSchema)

module.exports = { Policeman }