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

exports.getAllArticles = promise(async (req, res) => {
    const articles = await Article.find().populate("sectionId").populate("categoryId")
    if (!articles) throw new Exceptions.NotFound("No article found")

    res.status(200).json({ articles })
})

exports.getSingleArticles = promise(async (req, res) => {
    const body = req.body

    const article = await Article.findById(body.articleId).populate("sectionId").populate("categoryId")
    if (!article) throw new Exceptions.NotFound("No article found")

    res.status(200).json({ article })
})