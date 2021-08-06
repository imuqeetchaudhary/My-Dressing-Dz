const { User } = require("../db/models/user")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const { encrypt, decrypt } = require("../middlewares/encrypt-decrypt")
const jwt = require("jsonwebtoken")

exports.clientRegister = promise(async (req, res) => {
    const body = req.body
    const emailExists = await User.findOne({ email: body.email, role: "client" })
    if (emailExists) throw new Exceptions.EmailExist()

    const encryptPassword = encrypt(body.password)
    console.log("Encrypted Psssword: ", encryptPassword)

    const newUser = new User({
        ...body,
        role: "client",
        userName: `${body.firstName} ${body.lastName}`,
        password: encryptPassword.content,
        iv: encryptPassword.iv,
        isActive: true
    })

    await newUser.save()
    res.status(200).json({
        message: "Successfully saved a new user",
        user: newUser
    })

})

exports.professionalRegister = promise(async (req, res) => {
    const body = req.body

    const emailExists = await User.findOne({ email: body.email, role: "professional" })
    if (emailExists) throw new Exceptions.EmailExist()

    const encryptPassword = encrypt(body.password)

    const newUser = new User({
        ...body,
        role: "professional",
        userName: `${body.firstName} ${body.lastName}`,
        shopPhoto: req.file.filename,
        password: encryptPassword.encryptedData,
        iv: encryptPassword.iv,
    })

    await newUser.save()
    res.status(200).json({
        message: "Successfully saved a new user",
        user: newUser
    })

})

exports.login = promise(async (req, res) => {
    const body = req.body
    const user = await User.findOne({ email: body.email, role: body.role })
    if (!user) throw new Exceptions.CredentialsNotMatched

    const decryptPassword = decrypt(user)
    console.log("Original Password: ", decryptPassword)

    if(decryptPassword == body.password) {
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