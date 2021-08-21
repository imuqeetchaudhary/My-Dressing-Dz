const mongoose = require("mongoose")
const schema = mongoose.Schema

const likedarticleSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "User",
    },
    articleId: {
        type: schema.Types.ObjectId,
        ref: "Article",
    },
})

exports.LikedArticle = mongoose.model("LikedArticle", likedarticleSchema)