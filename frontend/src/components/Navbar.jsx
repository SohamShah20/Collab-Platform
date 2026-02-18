import { useAuth } from './Authprovider';

const Navbar = () => {
    const { user: loggedInUser, logout } = useAuth();
    return (
        <div className="relative z-50 w-full px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
                        C
                    </div>
                    <h1 className="font-bold text-xl tracking-wide text-white/90">
                        Collab<span className="text-blue-400">Platform</span>
                    </h1>
                </div>

                {loggedInUser ? (
                    <button
                        onClick={logout}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-300"
                    >
                        Logout
                    </button>
                ) : (
                    <div className="text-sm font-medium text-gray-300">
                        v1.0
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar