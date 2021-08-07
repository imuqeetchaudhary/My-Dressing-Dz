const express = require("express")
const router = express.Router()
const collection = require("../controllers/collection")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addCollectionSchema } = require("../validation/collection")

router
    .post("/add", validation(addCollectionSchema), collection.addCollection)
    .get("/get-all", collection.getCollections)

module.exports = router