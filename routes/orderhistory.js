const express = require("express")
const router = express.Router()
const orderhistory = require("../controllers/orderhistory")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addOrderHistorySchema } = require("../validation/orderhistory")

router
    .post("/add", authentication, validation(addOrderHistorySchema), orderhistory.addOrderHistory)

module.exports = router