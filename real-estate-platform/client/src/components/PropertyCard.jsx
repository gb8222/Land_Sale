import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Square, Tag } from "lucide-react";

const PropertyCard = ({ property }) => {
  const statusColors = {
    active: "bg-emerald-500 text-white shadow-emerald-200",
    available: "bg-emerald-500 text-white shadow-emerald-200",
    sold: "bg-rose-500 text-white shadow-rose-200",
    processing: "bg-orange-500 text-white shadow-orange-200",
    pending: "bg-orange-500 text-white shadow-orange-200",
  };

  const getStatusLabel = (status) => {
    if (status === 'active') return 'Available';
    if (status === 'pending') return 'Processing';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <motion.div 
      whileHover={{ y: -12 }}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col h-full group"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
        />
        
        {/* Status Badge */}
        <div className="absolute top-6 left-6">
          <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md ${statusColors[property.status] || 'bg-slate-500 text-white'}`}>
            {getStatusLabel(property.status)}
          </div>
        </div>

        {/* Floating Price */}
        <div className="absolute bottom-6 right-6">
          <div className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-white/20">
            <span className="text-primary font-black text-xl tracking-tighter">
              <span className="text-xs uppercase mr-1">Rs.</span>
              {Number(property.price).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center text-slate-400 mb-3 space-x-2">
          <MapPin size={14} className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest leading-none">
            {property.city ? `${property.city} | ${property.location}` : property.location}
          </span>
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 mb-4 line-clamp-1 group-hover:text-primary transition-colors tracking-tight">
          {property.title}
        </h3>

        {/* Quick Features */}
        <div className="grid grid-cols-2 gap-3 mb-8">
           <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
             <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
               <Square size={16} />
             </div>
             <span className="text-xs font-black text-slate-700 tracking-tight">{property.landSize || property.size} Perch</span>
           </div>
           <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
             <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
               <Tag size={16} />
             </div>
             <span className="text-xs font-black text-slate-700 tracking-tight">{property.type.toUpperCase()}</span>
           </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/property/${property.id}`}
          className="mt-auto group/btn flex items-center justify-between w-full p-2 pl-6 bg-slate-100 hover:bg-primary rounded-2xl transition-all duration-300"
        >
          <span className="text-xs font-black uppercase tracking-widest text-slate-600 group-hover/btn:text-white transition-colors">
            Analyze Details
          </span>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg group-hover/btn:translate-x-1 transition-transform">
            <ArrowRight size={18} className="text-primary" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard;