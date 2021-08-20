const mongoose = require("mongoose")
const schema = mongoose.Schema

const categorySchema = new schema({
    name: {
        type: String,
        require: true
    },
    sizes: [{
        type: String,
        require: true
    }]
})

exports.Category = mongoose.model("Category", categorySchema)