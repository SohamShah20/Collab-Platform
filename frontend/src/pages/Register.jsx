import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Authprovider";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth(); // Assuming register function exists in AuthProvider
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password); // Adjust based on AuthProvider signature
            // If successful, navigate to login or verify page
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            // Handle error (show toast, etc.)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white relative overflow-hidden">
            {/* Left Panel - Visuals (45%) */}
            <div className="hidden lg:flex w-[45%] bg-slate-900 relative items-center justify-center overflow-hidden">
                {/* Animated Abstract Background */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-12 text-white max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-lg">
                                C
                            </div>
                            <span className="font-bold text-2xl tracking-tight">CollabPlatform</span>
                        </div>
                        <h2 className="text-4xl font-bold leading-tight mb-6">
                            Join the community of <br />
                            <span className="text-blue-400">innovators.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Create your account to start collaborating in real-time. Experience the future of team productivity today.
                        </p>
                    </motion.div>

                    {/* Testimonial Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl"
                    >
                        <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-slate-200 mb-4 italic">"Joining this platform was the best decision for my career. The tools are intuitive and powerful."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                            <div>
                                <h4 className="font-semibold text-sm">Alex Rivera</h4>
                                <p className="text-xs text-slate-400">Senior Dev @ CodeCraft</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Panel - Form (55%) */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-8 sm:p-12 bg-gray-50/50">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100"
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your details to get started.
                        </p>
                    </div>

                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200">
                            <Chrome className="w-4 h-4 text-gray-900" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200">
                            <Github className="w-4 h-4 text-gray-900" />
                            GitHub
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-10 block w-full rounded-xl border-gray-200 bg-gray-50 border focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 transition-all duration-200"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 block w-full rounded-xl border-gray-200 bg-gray-50 border focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 transition-all duration-200"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 block w-full rounded-xl border-gray-200 bg-gray-50 border focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 transition-all duration-200"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Create Account <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Footer */}
                <div className="mt-8 flex gap-6 text-sm text-gray-400">
                    <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
