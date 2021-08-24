const { app } = require("./app")
const socketio = require("socket.io")
const isAuthMiddleware = require("./middlewares/socketIsAuth");
const { Room } = require("./db/models/room")
const room = require("./socket/createRoom")

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => {
    console.log(`Sever started at http://localhost:${PORT}`);
})

const io = socketio(server, {
    cors: { origin: "*" }
})

io.use(isAuthMiddleware)

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit("msg-from-server", "Hello from server")

    socket.on("create-room", async (data) => {

        const userId = socket.request.user._id
        const opposedUserId = data.user

        const roomExists = await Room.findOne({userId, opposedUserId})
        if(roomExists) return console.log("Room already exists")

        const newRoom = new Room({
            userId: userId,
            opposedUserId: opposedUserId,
        })
        newRoom.save()
        console.log("newly room created")

    })

})

module.exports = { io }