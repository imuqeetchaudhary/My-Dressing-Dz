const { Collection } = require("../db/models/collection")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

exports.addCollection = promise(async (req, res) => {
    const body = req.body

    const newCollection = new Collection({
        ...body
    })
    newCollection.save()
    res.status(200).json({ message: "Successfully added a new collection", newCollection })
})

exports.getCollections = promise(async (req, res) => {
    const collections = await Collection.find()
    if (!collections) throw new Exceptions.NotFound("No collection found")
    res.status(200).json({ collections })
})