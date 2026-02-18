import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Authprovider";

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    if(localStorage.getItem("accessToken")){
        navigate("/editor");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleLogin}
          className="w-[320px] bg-white rounded-xl shadow-lg p-6"
        >
          <h4 className="text-2xl font-bold text-center p-4">Login</h4>

          <div className="mb-1 p-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-4 mx-auto w-full h-10 rounded-md border border-black focus:outline-none "
            />
          </div>
          <div className="mb-4 p-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-4 mx-auto w-full h-10 rounded-md border border-black focus:outline-none "
            />
          </div>
          <div className="p-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full w-full"
            >
              Login
            </button>
          </div>
          <p className="text-sm m-4 text-center text-gray-600">
            New here?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
