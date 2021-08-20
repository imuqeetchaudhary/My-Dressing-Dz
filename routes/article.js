const express = require("express")
const router = express.Router()
const article = require("../controllers/article")
const { upload } = require("../middlewares/uploadImage")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addArticleSchema } = require("../validation/article")

router
    .post("/add",authentication, validation(addArticleSchema), upload.array("image"), article.addArticle)

module.exports = router