const yup = require("yup")

exports.addOrderHistorySchema = yup.object({
    storeId: yup.string().required(),
    articleId: yup.string().required(),
    size: yup.string().required(),
    quantity: yup.number().required(),
    price: yup.number().required(),
    deliveryOption: yup.string().required(),
    deliveryAddress: yup.string().required(),
    deliveryCity: yup.string().required(),
})