const express = require("express")
const router = express.Router()
const Document = require("../models/Document")
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" })
  }
}


router.post("/create", verifyToken, async (req, res) => {
  try {
    const doc = await Document.create({
      title: "Untitled Document",
      owner: req.user.id,
      collaborators: [req.user.id]
    })
    res.status(201).json(doc)
  } catch (err) {
    res.status(500).json({ message: "Error creating document" })
  }
})

router.get("/", verifyToken, async (req, res) => {
  try {
    const docs = await Document.find({
      collaborators: req.user.id
    }).sort({ updatedAt: -1 })
    res.json(docs)
  } catch (err) {
    res.status(500).json({ message: "Error fetching documents" })
  }
})

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: "Document not found" })


    if (!doc.collaborators.includes(req.user.id)) {
      return res.status(403).json({ message: "Access denied" })
    }

    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: "Error fetching document" })
  }
})

// Delete a document
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: "Document not found" })

    if (doc.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this document" })
    }

    await Document.findByIdAndDelete(req.params.id)
    res.json({ message: "Document deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Error deleting document" })
  }
})

module.exports = router
