const { User } = require("../db/models/user")
const { Article } = require("../db/models/article")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const { sendMail } = require("../middlewares/sendMail")
const { encrypt, decrypt } = require("../middlewares/encrypt-decrypt")
const jwt = require("jsonwebtoken")

exports.clientRegister = promise(async (req, res) => {
    const body = req.body
    const emailExists = await User.findOne({ email: body.email, role: "client" })
    if (emailExists) throw new Exceptions.EmailExist()

    // const encryptPassword = encrypt(body.password)
    // console.log("Encrypted Psssword: ", encryptPassword)

    const newUser = new User({
        ...body,
        role: "client",
        userName: `${body.firstName} ${body.lastName}`,
        // password: encryptPassword.content,
        // iv: encryptPassword.iv,
        isActive: true
    })

    await newUser.save()
    res.status(200).json({
        message: "Successfully saved a new user",
        user: newUser
    })

    const message = `Dear user ${newUser.userName}! Your login credentials for My Dressing Dz as a ${newUser.role} access are email: ${newUser.email}, password: ${newUser.password}`
    sendMail(newUser.email, message)

})

exports.professionalRegister = promise(async (req, res) => {
    const body = req.body

    const emailExists = await User.findOne({ email: body.email, role: "professional" })
    if (emailExists) throw new Exceptions.EmailExist()

    // const encryptPassword = encrypt(body.password)

    const newUser = new User({
        ...body,
        role: "professional",
        userName: `${body.firstName} ${body.lastName}`,
        shopPhoto: req.file.filename,
        sections: JSON.parse(body.sections)
        // password: encryptPassword.encryptedData,
        // iv: encryptPassword.iv,
    })

    await newUser.save()
    res.status(200).json({
        message: "Successfully saved a new user",
        user: newUser
    })

    const message = `Dear user ${newUser.userName}! Your login credentials for My Dressing Dz as a ${newUser.role} access are email: ${newUser.email}, password: ${newUser.password}`
    sendMail(newUser.email, message)

})

exports.login = promise(async (req, res) => {
    const body = req.body
    const user = await User.findOne({ email: body.email, role: body.role })
    if (!user) throw new Exceptions.CredentialsNotMatched

    // const decryptPassword = decrypt(user)
    // console.log("Original Password: ", decryptPassword)

    if (body.password == user.password) {
        const token = await jwt.sign({
            _id: user._id,
            name: user.userName,
            email: user.email,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json({
            token: token,
            _id: user._id,
            name: user.userName,
            email: user.email,
            role: user.role
        })
    }
    else {
        throw new Exceptions.CredentialsNotMatched()
    }



})

exports.forgetPassword = promise(async (req, res) => {
    const body = req.body

    const user = await User.findOne({ email: body.email, role: body.role })
    if (!user) throw new Exceptions.NotFound("User not found")

    const message = `Dear user ${user.userName}! your password for My Dressing Dz Website as a ${body.role} access user is ${user.password}`
    sendMail(user.email, message)

    res.status(200).json({ message: "Password send to you email." })


})

exports.getProfile = promise(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) throw new Exceptions.NotFound("User not found")
    res.status(200).json(user)
})

exports.updateProfile = promise(async (req, res) => {
    const body = req.body

    const updateUser = await User.updateOne(
        { _id: req.user._id },
        {
            $set: {
                ...body,
            }
        }
    )
    res.status(200).json({ message: "Successfully updated user profile" })
})

exports.getAllStores = promise(async (req, res) => {
    const stores = await User.find({ role: "professional" })
    if (!stores) throw new Exceptions.NotFound("No stores found")
    res.status(200).json({ stores })
})

exports.getSingleStore = promise(async (req, res) => {
    const body = req.body

    const store = await User.findOne({ _id: body.storeId, role: "professional" })
    if (!store) throw new Exceptions.NotFound("No stores found")
    console.log(store)
    res.status(200).json({ store })
})

exports.getArticlesForASingleStore = promise(async (req, res) => {
    const body = req.body

    const articles = await Article.find({ storeId: body.storeId })
    if (!articles) throw new Exceptions.NotFound("No article found")

    res.status(200).json({ articles })
})

exports.getArticlesForSpecificSectionOfASingleStore = promise(async (req, res) => {
    const body = req.body

    const articles = await Article.find({ storeId: body.storeId, sectionId: body.sectionId })
    if (!articles) throw new Exceptions.NotFound("No article found")

    res.status(200).json({ articles })
})