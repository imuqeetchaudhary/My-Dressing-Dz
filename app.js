const express = require("express")
const bodyParser = require("body-parser")
const dbConnect = require("./db/connection");
const user = require("./routes/user")
const section = require("./routes/section")
const category = require("./routes/category")
const article = require("./routes/article")
const store = require("./routes/user")
const cors = require("cors")

dbConnect();
const app = express()

app.use(express.static(__dirname + "/upload"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get("/", async (req, res) => {
    res.json({ message: "My Dressing Dz Rest Api" })
})

app.use("/user", user)
app.use("/section", section)
app.use("/category", category)
app.use("/article", article)
app.use("/store", store)

module.exports = { app }