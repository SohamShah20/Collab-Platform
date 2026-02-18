import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Authprovider";

const SignUp = () => {
  const navigate = useNavigate();
  const {register} = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    await register({name, email, password});
     navigate("/editor");
    
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSignUp}
          className="w-[320px] bg-white rounded-xl shadow-lg p-6"
        >
          <h4 className="text-2xl font-bold text-center mb-6">Sign up</h4>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-4 p-3 w-full rounded-md border border-black focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 p-3 w-full rounded-md border border-black focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-6 p-3 w-full rounded-md border border-black focus:outline-none"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 rounded-full w-full"
          >
            Sign up
          </button>

          <p className="text-sm mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
