const Document = require("../models/Document")

module.exports = function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log(`✓ Client connected: ${socket.id}`)

    socket.on("join-document", async (documentId) => {
      socket.join(documentId)
      console.log(`User ${socket.id} joined document ${documentId}`)

      // Load document from DB
      const document = await Document.findById(documentId)
      if (document) {
        socket.emit("load-document", document.content)
      }
    })

    socket.on("send-changes", (documentId, delta) => {
      // Broadcast changes to everyone else in the room
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async (documentId, content) => {
      console.log(`Saving document ${documentId}`);
      await Document.findByIdAndUpdate(documentId, { content })
      // Optional: Emit saved status back to client
      // socket.emit("document-saved") 
    })

    socket.on("disconnect", () => {
      console.log(`✗ Client disconnected: ${socket.id}`)
    })
  })
}
