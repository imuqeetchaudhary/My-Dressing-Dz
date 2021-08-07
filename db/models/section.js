const mongoose = require("mongoose")
const schema = mongoose.Schema

const sectionSchema = new schema({
    name: {
        type: String,
        require: true
    },
})

exports.Section = mongoose.model("Section", sectionSchema)