const mongoose = require("mongoose")
const schema = mongoose.Schema

const userSchema = new schema({
    role: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    shopName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    iv: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    shopPhoto: {
        type: String,
        require: true
    },
    facebook: {
        type: String,
        require: true
    },
    instagram: {
        type: String,
        require: true
    },
    sections: [{
        type: schema.Types.ObjectId,
        ref: "Section"
    }],
    isActive: {
        type: Boolean,
        default: false
    }
})

exports.User = mongoose.model("User", userSchema)