const mongoose = require("mongoose")
const schema = mongoose.Schema

const orderhistorySchema = new schema({
    clientId: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    storeId: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    articleId: {
        type: schema.Types.ObjectId,
        ref: "Article"
    },
    size: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    deliveryOption: {
        type: String,
        require: true
    },
    deliveryAddress: {
        type: String,
        require: true
    },
    deliveryCity: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "pending, processing"
    }
})

exports.OrderHistory = mongoose.model("OrderHistory", orderhistorySchema)