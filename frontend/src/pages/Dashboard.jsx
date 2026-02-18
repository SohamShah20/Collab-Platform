import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, FileText, LogOut } from "lucide-react";
import axios from "axios";
import { useAuth } from "../components/Authprovider";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5001";

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE_URL}/api/documents`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setLoading(false);

    }
  };

  const createDocument = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(`${API_BASE_URL}/api/documents/create`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/documents/${res.data._id}`);
    } catch (error) {
      console.error("Error creating document:", error);
      toast.error("Failed to create document");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md">
            C
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">CollabPlatform</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Your Documents</h1>
          <button
            onClick={createDocument}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5" />
            New Document
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 border-dashed">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No documents yet</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">Create your first document to start collaborating with your team in real-time.</p>
            <button
              onClick={createDocument}
              className="bg-white border border-gray-300 text-slate-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create Document
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <Link
                key={doc._id}
                to={`/documents/${doc._id}`}
                className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col h-48"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors truncate">
                    {doc.title || "Untitled Document"}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-3">
                    {doc.data ? "Contains content..." : "Empty document"}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-slate-400">
                  <span>Last edited {new Date(doc.updatedAt).toLocaleDateString()}</span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// Helper component for the arrow icon link
const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default Dashboard;
