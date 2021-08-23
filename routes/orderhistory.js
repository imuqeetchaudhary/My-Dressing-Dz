const express = require("express")
const router = express.Router()
const orderhistory = require("../controllers/orderhistory")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { addOrderHistorySchema, getOrderHistorySchema } = require("../validation/orderhistory")

router
    .post("/add", authentication, validation(addOrderHistorySchema), orderhistory.addOrderHistory)
    .get("/get-for-specific-client", authentication, orderhistory.getOrderHistoriesForSpecificClient)
    .get("/get-for-specific-store", authentication, orderhistory.getOrderHistoriesForSpecificStore)
    .post("/get-single", authentication, validation(getOrderHistorySchema), orderhistory.getSingleOrderHistory)

module.exports = router