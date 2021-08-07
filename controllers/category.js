const { Category } = require("../db/models/category")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addCategory = promise(async (req, res) => {
    const body = req.body

    const newCategory = new Category({
        ...body
    })
    newCategory.save()
    res.status(200).json({ message: "Successfully added a new category", newCategory })
})

exports.getCategory = promise(async (req, res) => {
    const category = await Category.find()
    if (!category) throw new Exceptions.NotFound("No category found")
    res.status(200).json({ category })
})