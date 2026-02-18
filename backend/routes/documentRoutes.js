const express = require("express")
const Document = require("../models/Document")
const auth = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", auth, async (req, res) => {
  const doc = await Document.create({
    owner: req.userId
  })
  res.json(doc)
})

router.get("/", auth, async (req, res) => {
  const docs = await Document.find({ owner: req.userId })
  res.json(docs)
})

router.get("/:id", auth, async (req, res) => {
  const doc = await Document.findById(req.params.id)
  res.json(doc)
})

router.delete("/:id", auth, async (req, res) => {
  await Document.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

module.exports = router
