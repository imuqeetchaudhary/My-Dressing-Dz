const yup = require("yup")

exports.addCategorySchema = yup.object({
    name: yup.string().required()
})