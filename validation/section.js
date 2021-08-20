const yup = require("yup")

exports.addSectionSchema = yup.object({
    name: yup.string().required()
})

exports.getSectionSchema = yup.object({
    sectionId: yup.string().required()
})