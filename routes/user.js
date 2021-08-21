const express = require("express")
const router = express.Router()
const user = require("../controllers/user")
const { upload } = require("../middlewares/uploadImage")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const {
    clientRegisterSchema,
    professionalRegisterSchema,
    loginSchema,
    forgetPasswordSchema,
    getSingleStoreSchema
} = require("../validation/user")

router
    .post("/client-register", validation(clientRegisterSchema), user.clientRegister)
    .post("/professional-register", validation(professionalRegisterSchema), upload.single("image"), user.professionalRegister)
    .post("/login", validation(loginSchema), user.login)
    .post("/forget-password", validation(forgetPasswordSchema), user.forgetPassword)
    .get("/get-all", user.getAllStores)
    .post("/get-single", validation(getSingleStoreSchema), user.getSingleStore)

module.exports = router