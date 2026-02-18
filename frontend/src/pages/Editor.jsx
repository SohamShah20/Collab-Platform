import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import socket from "../socket"

export default function Editor() {
  const { id } = useParams()
  const quillRef = useRef(null)

  useEffect(() => {
    socket.emit("join-document", id)

    socket.on("load-document", content => {
      quillRef.current.getEditor().setContents(content)
    })

    socket.on("receive-changes", delta => {
      quillRef.current.getEditor().updateContents(delta)
    })

  }, [id])

  const handleChange = (content, delta) => {
    socket.emit("send-changes", id, delta)
    socket.emit("save-document", id, content)
  }

  return (
    <div>
      <h2>Editor</h2>
      <ReactQuill ref={quillRef} onChange={handleChange} />
    </div>
  )
}
