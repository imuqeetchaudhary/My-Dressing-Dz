const yup = require("yup")

exports.clientRegisterSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(5).max(10),
    number: yup.number().required(),
    address: yup.string().required(),
})

exports.professionalRegisterSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    shopName: yup.string().required(),
    shopPhoto: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(5).max(10),
    number: yup.number().required(),
    address: yup.string().required(),
    facebook: yup.string(),
    instagram: yup.string(),
})

exports.loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.string().required()
})

exports.forgetPasswordSchema = yup.object({
    email: yup.string().email().required(),
    role: yup.string().required()
})