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
    getSingleStoreSchema,
    getArticleForSpecificSectionOfStoreSchema,
    getArticleForSpecificCategoryOfStoreSchema
} = require("../validation/user")

router
    .post("/client-register", validation(clientRegisterSchema), user.clientRegister)
    .post("/professional-register", validation(professionalRegisterSchema), upload.single("image"), user.professionalRegister)
    .post("/login", validation(loginSchema), user.login)
    .post("/forget-password", validation(forgetPasswordSchema), user.forgetPassword)
    .get("/profile", authentication, user.getProfile)
    .patch("/update-profile", authentication, user.updateProfile)
    .get("/get-all", user.getAllStores)
    .post("/get-single", validation(getSingleStoreSchema), user.getSingleStore)
    .post("/get-articles", validation(getSingleStoreSchema), user.getArticlesForASingleStore)
    .post(
        "/get-articles-for-specific-section",
        validation(getArticleForSpecificSectionOfStoreSchema),
        user.getArticlesForSpecificSectionOfASingleStore
    )
    .post(
        "/get-articles-for-specific-category",
        validation(getArticleForSpecificCategoryOfStoreSchema),
        user.getArticlesForSpecificCategoryOfASingleStore
    )

module.exports = router