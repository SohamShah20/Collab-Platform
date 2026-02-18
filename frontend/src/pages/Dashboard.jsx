import { useEffect, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [docs, setDocs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get("/documents").then(res => setDocs(res.data))
  }, [])

  const createDoc = async () => {
    const res = await api.post("/documents")
    navigate(`/document/${res.data._id}`)
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={createDoc}>New Document</button>

      {docs.map(doc => (
        <div key={doc._id} onClick={() => navigate(`/document/${doc._id}`)}>
          {doc.title}
        </div>
      ))}
    </div>
  )
}
