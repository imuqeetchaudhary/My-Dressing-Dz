const { Section } = require("../db/models/section")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addSection = promise(async (req, res) => {
    const body = req.body

    const newSection = new Section({
        ...body
    })
    newSection.save()
    res.status(200).json({ message: "Successfully added a new section", newSection })
})

exports.getAllSections = promise(async (req, res) => {
    const sections = await Section.find()
    if (!sections) throw new Exceptions.NotFound("No section found")
    res.status(200).json({ sections })
})

exports.getSingleSection = promise(async (req, res) => {
    const body = req.body

    const section = await Section.findById(body.sectionId)
    if (!section) throw new Exceptions.NotFound("No section found")
    res.status(200).json({ section })
})

exports.getMultipleSectionsWithArray = promise(async (req, res) => {
    const body = req.body

    const sections = await Section.find({ _id: { $in: body.sectionId } })
    if (!sections) throw new Exceptions.NotFound("No section found")

    res.status(200).json(sections)
})