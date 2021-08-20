const yup = require("yup")

exports.addArticleSchema = yup.object({
    articleName: yup.string().required(),
    articleDescription: yup.string().required(),
    image: yup.string().required(),
    sectionId: yup.string().required(),
    categoryId: yup.string().required(),
    brandName: yup.string().required(),
    city: yup.string().required(),
    onlineDate: yup.string().required(),
    availableSizes: yup.string().required(),
    totalStock: yup.string().required(),
    indicatedPrice: yup.string().required(),
    finalPrice: yup.string().required(),
})

exports.getArticleSchema = yup.object({
    articleId: yup.string().required()
})

exports.searchArticleSchema = yup.object({
    storeName: yup.string(),
    sectionName: yup.string(),
    categoryName: yup.string(),
    articleName: yup.string(),
    city: yup.string()
})