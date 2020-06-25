const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require('cors')

// nodemon - server
// npm run serve - vue

mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb+srv://bicycles:bicycles@cluster0-wax9b.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
})
mongoose.connection.on('connected', () => {
    console.log('Mongo DB connected!')
})
mongoose.connection.on('error', (err) => {
    console.log("Mongo errors: ", err)
})

app.use(cors())
app.use(express.json())
app.use(require("./routes/bicycle"))
app.use(require("./routes/police"))

app.listen(5000, () => {
    console.log(`Server Running at ${5000}`)
});