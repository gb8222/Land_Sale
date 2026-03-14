import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Building2, LogIn, LayoutDashboard, LogOut, Menu, X, ArrowRight, CheckCircle } from "lucide-react";

import logo from "../assets/logo/dhammika-residence-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Sold Properties", path: "/sold" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`glass-header transition-all duration-500 overflow-visible ${isScrolled ? 'py-4 shadow-xl shadow-slate-200/40' : 'py-6 bg-white border-b border-slate-100 px-2'
      }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-4 group relative">
          <motion.img
            src={logo}
            alt="DHAMMIKA RESIDENCE Logo"
            className="h-[35px] md:h-[40px] xl:h-[50px] w-auto transition-all duration-500 group-hover:scale-110"
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 group-hover:text-primary transition-colors leading-none">
              DHAMMIKA <span className="text-primary/70">RESIDENCE</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">Premium Real Estate</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-10">
          <div className="flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link-premium text-[13px] ${isActive(link.path) ? 'text-primary active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 ml-2"></div>

          {isAdmin ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className={`flex items-center space-x-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${isActive('/admin') ? 'text-primary' : 'text-slate-500 hover:text-primary'
                  }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm border border-red-100"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>
          ) : (
            null
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-600 hover:bg-slate-100 transition-all active:scale-90"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`xl:hidden fixed inset-x-0 bg-white/95 backdrop-blur-2xl border-b border-slate-100 overflow-hidden transition-all duration-500 ease-in-out z-40 ${isMenuOpen ? 'top-full max-h-[90vh] py-8 opacity-100 shadow-2xl' : 'top-full max-h-0 py-0 opacity-0 pointer-events-none'
        }`}>
        <div className="container mx-auto px-8 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-between py-3 border-b border-slate-50 font-black text-xl tracking-tight transition-all ${isActive(link.path) ? 'text-primary' : 'text-slate-900'
                }`}
            >
              <span>{link.name}</span>
              <ArrowRight className={`w-5 h-5 ${isActive(link.path) ? 'text-primary' : 'text-slate-300'}`} />
            </Link>
          ))}

          <div className="pt-4">
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 p-5 rounded-2xl bg-red-50 text-red-600 font-bold transition-all active:scale-95 border border-red-100"
              >
                <LogOut className="w-6 h-6" />
                <span>Logout</span>
              </button>
            ) : (
              null
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;