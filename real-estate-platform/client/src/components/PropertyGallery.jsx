import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle } from "lucide-react";

const PropertyGallery = ({ images, status, type }) => {
  const [activeImage, setActiveImage] = useState(0);

  const statusColors = {
    active: "bg-emerald-500 text-white shadow-emerald-200",
    available: "bg-emerald-500 text-white shadow-emerald-200",
    sold: "bg-rose-500 text-white shadow-rose-200",
    processing: "bg-orange-500 text-white shadow-orange-200",
    pending: "bg-orange-500 text-white shadow-orange-200",
  };

  const getStatusLabel = (s) => {
    if (s === 'active' || s === 'available') return 'Available';
    if (s === 'pending') return 'Processing';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 lg:h-[600px] xl:h-[700px]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="lg:col-span-3 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl relative group h-[350px] md:h-[500px] lg:h-full"
      >
        <img 
          src={images[activeImage]} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          alt="Property Main" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-wrap gap-3 md:gap-4">
          <div className={`px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md ${statusColors[status]}`}>
            {getStatusLabel(status)}
          </div>
          <div className="px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-2xl flex items-center gap-2">
            <CheckCircle size={12} className="text-emerald-400" />
            <span>Legal Clearance Verified</span>
          </div>
        </div>
      </motion.div>
      
      {/* Thumbnails - Horizontal on mobile, Vertical on desktop */}
      <div className="flex lg:flex-col gap-3 md:gap-4 h-auto lg:h-full overflow-x-auto lg:overflow-y-auto py-2 lg:py-0 pr-2 custom-scrollbar snap-x lg:snap-none">
        {images.map((img, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setActiveImage(idx)}
            className={`w-24 h-20 md:w-32 md:h-24 lg:w-full lg:h-32 xl:h-40 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lg relative group cursor-pointer border-4 transition-all shrink-0 snap-center ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
          >
            <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Thumbnail ${idx}`} />
            <div className={`absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors ${activeImage === idx ? 'opacity-0' : 'opacity-100'}`}></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
