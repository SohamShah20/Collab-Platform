import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import { socket } from "../socket"

export default function Editor() {
  const { id } = useParams()
  const quillRef = useRef(null)

  useEffect(() => {
    socket.emit("join-document", id)

    // Ensure socket listeners are set up correctly
    const loadHandler = (content) => {
      if (quillRef.current) {
        quillRef.current.getEditor().setContents(content)
      }
    }

    const changeHandler = (delta) => {
      if (quillRef.current) {
        quillRef.current.getEditor().updateContents(delta)
      }
    }

    socket.on("load-document", loadHandler)
    socket.on("receive-changes", changeHandler)

    return () => {
      socket.off("load-document", loadHandler)
      socket.off("receive-changes", changeHandler)
    }

  }, [id])

  const handleChange = (content, delta, source, editor) => {
    // Only emit changes if the source is 'user' to avoid loop
    if (source !== 'user') return;

    // We send the delta (change) to other clients for real-time updates
    socket.emit("send-changes", id, delta);

    // We send the full content to save to the database
    // Optimization: Debounce this in production
    socket.emit("save-document", id, content);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="text-gray-500 hover:text-gray-700">
            &larr; Back
          </button>
          <h1 className="font-semibold text-lg text-gray-800">Document Editor</h1>
        </div>
        <div className="text-sm text-gray-500">
          {socket.connected ? <span className="text-green-500">● Connected</span> : <span className="text-red-500">● Disconnected</span>}
        </div>
      </nav>
      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
          <ReactQuill
            theme="snow"
            ref={quillRef}
            onChange={handleChange}
            className="h-full"
            style={{ height: '500px' }}
          />
        </div>
      </div>
    </div>
  )
}
