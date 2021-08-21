const { Article } = require("../db/models/article")
const { LikedArticle } = require("../db/models/likedArticles")
const { User } = require("../db/models/user")
const { Section } = require("../db/models/section")
const { Category } = require("../db/models/category")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addArticle = promise(async (req, res) => {
    const body = req.body

    const store = await User.findById(req.user._id)
    if (!store) throw new Exceptions.NotFound("Store not found")
    console.log(store.userName);

    if (store.isActive) {

        const section = await Section.findById(body.sectionId)
        if (!section) throw new Exceptions.NotFound("Section not found")
        console.log(section.name);

        const category = await Category.findById(body.categoryId)
        if (!category) throw new Exceptions.NotFound("Category not found")
        console.log(category.name);

        let images = []

        req.files.forEach(imageUrl => {
            images = [...images, imageUrl.filename]
        })

        const newArticle = new Article({
            ...req.body,
            storeId: req.user._id,
            storeName: store.userName.toLowerCase(),
            sectionName: section.name.toLowerCase(),
            categoryName: category.name.toLowerCase(),
            images: images,
            availableSizes: JSON.parse(body.availableSizes)
        })

        await newArticle.save()
        res.status(200).json({ message: "Successfuly added article", newArticle })
    }
    else {
        throw new Exceptions.BadRequset("Please buy 6 months subscription in order to add product")
    }

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

exports.searchArticle = promise(async (req, res) => {
    const body = req.body

    const article = await Article.find({
        $or: [
            { storeName: body.storeName },
            { sectionName: body.sectionName },
            { categoryName: body.categoryName },
            { articleName: body.articleName },
            { city: body.city }
        ]
    })
    if (!article) throw new Exceptions.NotFound("No article found")

    res.status(200).json({ article })
})

exports.deleteArticle = promise(async (req, res) => {
    const body = req.body

    const deleteArticle = await Article.deleteOne({ _id: body.articleId, storeId: req.user._id })
    res.status(200).json({ message: "Successfully deleted article" })
})

exports.likeArticle = promise(async (req, res) => {
    const body = req.body

    const likedArticle = await LikedArticle.findOne({ userId: req.user._id, articleId: body.articleId })

    if (likedArticle) {

        const article = await Article.findById(body.articleId)
        if (!article) throw new Exceptions.NotFound("Article not found")

        const deleteLike = await Article.updateOne(
            { _id: body.articleId },
            {
                $set: {
                    likes: article.likes - 1
                }
            }
        )

        const deleteLikedArticle = await LikedArticle.deleteOne({ userId: req.user._id, articleId: body.articleId })

        res.status(200).json({ message: "Successfully unliked article" })
    }

    else {

        const article = await Article.findById(body.articleId)
        if (!article) throw new Exceptions.NotFound("Article not found")

        const addLike = await Article.updateOne(
            { _id: body.articleId },
            {
                $set: {
                    likes: article.likes + 1
                }
            }
        )

        const newLikedArticle = new LikedArticle({
            userId: req.user._id,
            articleId: body.articleId
        })
        await newLikedArticle.save()

        res.status(200).json({ message: "Successfully liked article" })
    }
})