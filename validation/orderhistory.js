const yup = require("yup")

exports.addOrderHistorySchema = yup.object({
    storeId: yup.string().required(),
    articleId: yup.string().required(),
    size: yup.string().required(),
    quantity: yup.number().required(),
    deliveryOption: yup.string().required(),
    deliveryAddress: yup.string(),
    deliveryCity: yup.string(),
})

exports.getOrderHistorySchema = yup.object({
    orderHistoryId: yup.string().required()
})

exports.updateOrderHistoryStatusSchema = yup.object({
    orderHistoryId: yup.string().required(),
    status: yup.string().required(),
    isCompleted: yup.boolean().required(),
})