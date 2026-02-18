require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const http = require("http")
const { Server } = require("socket.io")

// const authRoutes = require("./routes/authRoutes")
// const documentRoutes = require("./routes/documentRoutes")
const socketHandler = require("./socket/socketHandler")

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  }
})

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// app.use("/api/auth", authRoutes)
// app.use("/api/documents", documentRoutes)

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err))

socketHandler(io)

server.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
)
