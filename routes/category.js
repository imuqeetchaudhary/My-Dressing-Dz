const express = require("express")
const router = express.Router()
const category = require("../controllers/category")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addCategorySchema, getCategorySchema } = require("../validation/category")

router
    .post("/add", validation(addCategorySchema), category.addCategory)
    .get("/get-all", category.getAllCategory)
    .get("/get-single", validation(getCategorySchema), category.getSingleCategory)

module.exports = router