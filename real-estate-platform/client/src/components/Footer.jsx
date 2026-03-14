import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import logo from "../assets/logo/dhammika-residence-logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-slate-300 relative overflow-hidden text-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-accent"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col space-y-3 group">
              <img src={logo} alt="DHAMMIKA RESIDENCE" className="h-10 w-auto object-contain self-start transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white">
                  DHAMMIKA<span className="text-primary/70"> RESIDENCE</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-0.5">Premium Houses and Lands in Sri Lanka</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed font-medium text-xs">
              Negombo's premier real estate developer and consultant. We deliver excellence in luxury housing and prime land investments.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-slate-800 hover:bg-primary text-slate-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: 'Properties', path: '/properties' },
                { name: 'Sold Properties', path: '/sold' },
                { name: 'Projects', path: '/projects' },
                { name: 'About Us', path: '/about' }
              ].map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-primary transition-colors flex items-center font-bold text-xs tracking-wide group"
                  >
                    <div className="w-1 h-1 bg-slate-700 group-hover:bg-primary rounded-full mr-2 transition-colors"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <div className="text-white font-bold text-xs">Main Office</div>
                  <span className="text-slate-400 text-xs font-medium">DHAMMIKA RESIDENCE, 444 Station Rd, Katunayake</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <div className="text-white font-bold text-xs">Call Center</div>
                  <span className="text-slate-400 text-xs font-medium"> 0773302930</span>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <div className="text-white font-bold text-xs">Email Us</div>
                  <span className="text-slate-400 text-xs font-medium">dhammikaresidence@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Insights</h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">Join our inner circle for the latest project releases and market trends.</p>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary text-xs outline-none transition-all placeholder:text-slate-600 focus:bg-slate-800"
              />
              <button className="absolute right-1.5 top-1.5 bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-all hover:translate-x-1 shadow-lg shadow-primary/20">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <p>© {new Date().getFullYear()} DHAMMIKA RESIDENCE DEVELOPERS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
;