const { OrderHistory } = require("../db/models/orderhistory")
const { Article } = require("../db/models/article")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addOrderHistory = promise(async (req, res) => {
    const body = req.body

    const article = await Article.findById(body.articleId)
    if (!article) throw new Exceptions.NotFound("No article found")

    const totalPrice = (body.quantity * article.finalPrice)

    const newOrderHistory = new OrderHistory({
        ...body,
        clientId: req.user._id,
        price: totalPrice
    })
    await newOrderHistory.save()
    res.status(200).json({ message: "Successfully added order history", newOrderHistory })
})

exports.getOrderHistoriesForSpecificClient = promise(async (req, res) => {
    const orderhistory = await OrderHistory.find({ clientId: req.user._id })
    if (!orderhistory) throw new Exceptions.NotFound("No order history found")

    res.status(200).json({ orderhistory })
})

exports.getPendingOrderHistoriesForSpecificStore = promise(async (req, res) => {
    const orderhistory = await OrderHistory.find({ storeId: req.user._id, isCompleted: false })
    if (!orderhistory) throw new Exceptions.NotFound("No order history found")

    res.status(200).json({ orderhistory })
})

exports.getCompleteOrderHistoriesForSpecificStore = promise(async (req, res) => {
    const orderhistory = await OrderHistory.find({ storeId: req.user._id, isCompleted: true })
    if (!orderhistory) throw new Exceptions.NotFound("No order history found")

    res.status(200).json({ orderhistory })
})

exports.getAllOrderHistories = promise(async (req, res) => {
    const orderhistory = await OrderHistory.find()
    if (!orderhistory) throw new Exceptions.NotFound("No order history found")

    res.status(200).json({ orderhistory })
})

exports.getSingleOrderHistory = promise(async (req, res) => {
    const body = req.body

    const orderhistory = await OrderHistory.findById(body.orderHistoryId)
    if (!orderhistory) throw new Exceptions.NotFound("No order history found")

    res.status(200).json({ orderhistory })
})