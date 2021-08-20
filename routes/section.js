const express = require("express")
const router = express.Router()
const section = require("../controllers/section")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addSectionSchema, getSectionSchema } = require("../validation/section")

router
    .post("/add", validation(addSectionSchema), section.addSection)
    .get("/get-all", section.getAllSections)
    .get("/get-single", validation(getSectionSchema), section.getSingleSection)

module.exports = router