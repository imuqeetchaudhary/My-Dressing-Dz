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
    .post("/add", authentication,  upload.array("image"), article.addArticle)
    .get("/get-all", article.getAllArticles)
    .get("/get-single", validation(getArticleSchema), article.getAllArticles)
    .post("/search", validation(searchArticleSchema), article.searchArticle)
    .delete("/delete", authentication, validation(getArticleSchema), article.deleteArticle)

module.exports = router