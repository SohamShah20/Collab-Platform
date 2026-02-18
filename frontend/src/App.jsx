import { useState, useEffect } from "react"
import { socket } from "./socket"
import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    // Ensure the socket connects when the component mounts
    socket.connect()

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.disconnect()
    }
  }, [])

  return (
    <div className="app-container">
      <h1>Project Starter</h1>
      <div className="status-indicator">
        Socket Status: <span style={{ color: isConnected ? 'green' : 'red' }}>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      {/* Add your project components here */}
    </div>
  )
}

export default App
