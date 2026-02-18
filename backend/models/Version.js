const mongoose = require("mongoose")

const versionSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
  content: String,
  savedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Version", versionSchema)
