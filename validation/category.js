const yup = require("yup")

exports.addCategorySchema = yup.object({
    name: yup.string().required(),
    sizes: yup.string().required()
})

exports.getCategorySchema = yup.object({
    categoryId: yup.string().required(),
})