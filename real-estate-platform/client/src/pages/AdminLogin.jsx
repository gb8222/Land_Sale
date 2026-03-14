import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Building2, Lock, Mail, ChevronRight, ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      // Compatibility with older firebase vs modern
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem("adminToken", token);
      toast.success("Welcome Back, Administrator");
      navigate("/admin");
    } catch (error) {
      // Modern Firebase Login
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem("adminToken", token);
        toast.success("Welcome Back, Administrator");
        navigate("/admin");
      } catch (err) {
        toast.error("Invalid credentials. Access Denied.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 py-12 px-6 fade-in">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl shadow-xl shadow-primary/20 mb-6 transform hover:rotate-12 transition-transform duration-500">
            <Building2 className="text-white w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-2">Admin Portal</h2>
          <p className="text-slate-500 font-medium">Enter your credentials to manage properties</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-10 -mt-10 rounded-full blur-2xl"></div>
          
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  className="input-field-premium pl-12"
                  placeholder="admin@propsale.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  className="input-field-premium pl-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium-primary w-full py-4 text-center flex items-center justify-center space-x-2 text-lg shadow-xl shadow-primary/20"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Footer */}
        <div className="mt-8 flex items-center justify-center space-x-2 text-slate-400 font-medium">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span className="text-sm">Secure End-to-End Encryption Enabled</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;