const express = require("express")
const router = express.Router()
const user = require("../controllers/user")
const { upload } = require("../middlewares/uploadImage")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { clientRegisterSchema, professionalRegisterSchema } = require("../validation/user")

router
    .post("/client-register", validation(clientRegisterSchema), user.clientRegister)
    .post("/professional-register", validation(professionalRegisterSchema), upload.single("image"), user.professionalRegister)

module.exports = router