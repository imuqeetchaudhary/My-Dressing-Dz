const mongoose = require("mongoose")
const schema = mongoose.Schema

const collectionSchema = new schema({
    name: {
        type: String,
        require: true
    },
})

exports.Collection = mongoose.model("Collection", collectionSchema)