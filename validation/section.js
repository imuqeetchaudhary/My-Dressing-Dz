const yup = require("yup")

exports.addSectionSchema = yup.object({
    name: yup.string().required()
})