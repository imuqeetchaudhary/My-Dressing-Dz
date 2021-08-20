const mongoose = require("mongoose")
const schema = mongoose.Schema

const articleSchema = new schema({
    storeId: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    storeName: {
        type: String,
    },
    articleName: {
        type: String,
        require: true
    },
    articleDescription: {
        type: String,
        require: true
    },
    images: [{
        type: String,
        require: true
    }],
    sectionId: {
        type: schema.Types.ObjectId,
        ref: "Section",
        require: true
    },
    sectionName: {
        type: String,
    },
    categoryId: {
        type: schema.Types.ObjectId,
        ref: "Category",
        require: true
    },
    categoryName: {
        type: String,
    },
    brandName: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    onlineDate: {
        type: Date,
        require: true
    },
    availableSizes: [{
        type: String,
        require: true
    }],
    likes: {
        type: Number,
        default: 0
    },
    totalStock: {
        type: Number,
        require: true
    },
    indicatedPrice: {
        type: Number,
        require: true
    },
    finalPrice: {
        type: Number,
        require: true
    },
})

exports.Article = mongoose.model("Article", articleSchema)