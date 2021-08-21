const { OrderHistory } = require("../db/models/orderhistory")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addOrderHistory = promise(async (req, res) => {
    const body = req.body

    const newOrderHistory = new OrderHistory({
        ...body,
        clientId: req.user._id
    })
    await newOrderHistory.save()
    res.status(200).json({ message: "Successfully added order history", newOrderHistory })
})