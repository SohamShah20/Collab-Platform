module.exports = function socketHandler(io) {
  io.use((socket, next) => {
    next()
  })

  io.on("connection", (socket) => {
    console.log(`✓ Client connected: ${socket.id}`)

    const clientCount = io.engine.clientsCount
    console.log(`  Total clients connected: ${clientCount}`)

    io.emit("user-joined", {
      userId: socket.id,
      totalUsers: clientCount,
      message: "A new user connected"
    })

    socket.on("message", (data) => {
      console.log(`Message from ${socket.id}:`, data)

      io.emit("message", {
        userId: socket.id,
        content: data.content,
        timestamp: new Date()
      })
    })

    socket.on("disconnect", () => {
      console.log(`✗ Client disconnected: ${socket.id}`)

      const updatedClientCount = io.engine.clientsCount
      console.log(`  Total clients connected: ${updatedClientCount}`)

      io.emit("user-left", {
        userId: socket.id,
        totalUsers: updatedClientCount,
        message: "A user disconnected"
      })
    })

    socket.on("error", (error) => {
      console.error(`Socket error for ${socket.id}:`, error)
    })
  })
}
