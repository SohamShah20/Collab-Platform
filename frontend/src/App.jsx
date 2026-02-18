import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { socket } from "./socket"
import AuthProvider from "./components/Authprovider"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Editor from "./pages/Editor"
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


    socket.connect()

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.disconnect()
    }
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Status Indicator */}
        <div style={{ position: 'fixed', top: 10, right: 10, padding: '5px 10px', background: isConnected ? '#d4edda' : '#f8d7da', color: isConnected ? '#155724' : '#721c24', borderRadius: 4, zIndex: 9999, fontSize: '12px', fontWeight: 'bold' }}>
          Socket: {isConnected ? "Connected" : "Disconnected"}
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/documents/:id" element={<Editor />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
