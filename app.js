const express = require("express")
const bodyParser = require("body-parser")
const dbConnect = require("./db/connection");
const user = require("./routes/user")
const section = require("./routes/section")
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

module.exports = { app }