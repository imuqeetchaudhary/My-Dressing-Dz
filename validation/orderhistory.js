const yup = require("yup")

exports.addOrderHistorySchema = yup.object({
    storeId: yup.string().required(),
    articleId: yup.string().required(),
    size: yup.string().required(),
    quantity: yup.number().required(),
    deliveryOption: yup.string().required(),
    deliveryAddress: yup.string().required(),
    deliveryCity: yup.string().required(),
})

exports.getOrderHistorySchema = yup.object({
    orderHistoryId: yup.string().required()
})