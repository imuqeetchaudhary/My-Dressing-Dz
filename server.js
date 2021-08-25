const { app } = require("./app")
const socketio = require("socket.io")
const isAuthMiddleware = require("./middlewares/socketIsAuth");
const { Room } = require("./db/models/room")
const { User } = require("./db/models/user")

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
    socket.emit("hello-from-server", "Hello from server")

    socket.on("create-room", async (data) => {

        const userId = socket.request.user._id
        const opposedUserId = data.userId

        const roomExists = await Room.findOne({ userId, opposedUserId })
        if (roomExists) return console.log("Room already exists")

        const newRoom = new Room({
            userId: userId,
            opposedUserId: opposedUserId,
        })
        newRoom.save()
        console.log("newly room created")

    })

    socket.on("all-rooms", async (cb) => {
        const userId = socket.request.user._id
        // console.log("UserId:", userId)

        const rooms = await Room.find({ userId })
        if (!rooms) cb("No rooms found")

        const allRooms = { allROoms: rooms }
        // console.log("All Rooms:", allRooms)

        cb(allRooms)
    })

    socket.on("chat-history", async (data, cb) => {
        const roomId = data.roomId
        // console.log("RoomId:", roomId)

        const room = await Room.findById(roomId)
        if (!room) return console.log("Room not found")

        // console.log("UserId:", room.userId)
        const user = await User.findById(room.userId).select("userName email")
        // console.log("User", user)

        // console.log("OpposedUserId:", room.opposedUserId)
        const opposedUser = await User.findById(room.opposedUserId).select("userName email")
        // console.log("OpposedUser", opposedUser)

        const chatObj = {
            [user._id]: user,
            [opposedUser._id]: opposedUser,
            chatHistory: room.chat
        }

        // console.log("Chat History:", chatObj)
        cb(chatObj)

    })

    socket.on("msg-from-client", async (data) => {

        const roomId = data.roomId
        // console.log("RoomId:", roomId)

        const message = data.message
        // console.log("Message:", message)

        const room = await Room.findById(roomId)
        if (!room) return console.log("Room not found")

        const userId = socket.request.user._id
        // console.log("UserId:", userId)

        const opposedUserId = room.opposedUserId
        // console.log("OpposedUserId:", opposedUserId)

        const opposedUser = await User.findById(opposedUserId)
        if (!opposedUser) return console.log("opposedUser not found")

        await Room.updateOne(
            { _id: roomId },
            {
                $push: {
                    chat: {
                        userId: userId,
                        message: message
                    }
                }
            }
        )

        socket.emit("msg-from-server", {
            userId: userId,
            message: message,
        }, (data) => {
            console.log(data)
        })

    })

})

module.exports = { io }