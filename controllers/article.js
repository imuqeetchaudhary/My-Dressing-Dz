const { Article } = require("../db/models/article")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addArticle = promise(async (req, res) => {
    const body = req.body

    let images = []

    req.files.forEach(imageUrl => {
        images = [...images, imageUrl.filename]
    })

    const newArticle = new Article({
        ...req.body,
        storeId: req.user._id,
        images: images,
        availableSizes: JSON.parse(body.availableSizes)
    })

    await newArticle.save()
    res.status(200).json({ message: "Successfuly added article", newArticle })
})