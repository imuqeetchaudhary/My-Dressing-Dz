const yup = require("yup")

exports.addCollectionSchema = yup.object({
    name: yup.string().required()
})