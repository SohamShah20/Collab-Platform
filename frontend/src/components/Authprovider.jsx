import { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
const API_BASE_URL = "http://localhost:5001";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setUser({ accessToken });
    }
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
      toast.success("Registration successful! Please log in.");
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again.",
      );
      console.error("Registration error:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      setUser({ accessToken });
      toast.success("Login successful!");
      return res.data;
    } catch (error) {
      toast.error(
        "Login failed. Please check your credentials and try again.",
      );
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
