const express = require("express")
const router = express.Router()
const article = require("../controllers/article")
const { upload } = require("../middlewares/uploadImage")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const {
    addArticleSchema,
    getArticleSchema,
    searchArticleSchema
} = require("../validation/article")

router
    .post("/add", authentication, validation(addArticleSchema), upload.array("image"), article.addArticle)
    .get("/get-all", article.getAllArticles)
    .post("/get-single", authentication, validation(getArticleSchema), article.getSingleArticle)
    .post("/search", validation(searchArticleSchema), article.searchArticle)
    .delete("/delete", authentication, validation(getArticleSchema), article.deleteArticle)
    .patch("/like", authentication, validation(getArticleSchema), article.likeArticle)

module.exports = router