import { Search, Filter, SlidersHorizontal, MapPin, Tag, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";

const SearchBar = ({ onSearch, filters, setFilters }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[3rem] p-4 shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col lg:flex-row items-center gap-4 max-w-6xl mx-auto -mt-12 relative z-30"
    >
      {/* Location Search */}
      <div className="flex-grow flex items-center px-6 py-4 bg-slate-50 rounded-[2rem] w-full lg:w-auto group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <MapPin size={20} className="text-primary mr-4" />
        <input 
          type="text" 
          placeholder="Search by location (e.g. Negombo, Kochchikade...)"
          className="bg-transparent border-none outline-none w-full text-slate-900 font-bold placeholder:text-slate-400"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center px-6 py-4 bg-slate-50 rounded-[2rem] w-full lg:w-auto min-w-[180px]">
        <Tag size={20} className="text-primary mr-4" />
        <select 
          className="bg-transparent border-none outline-none w-full text-slate-800 font-bold appearance-none cursor-pointer"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">All Status</option>
          <option value="active">Available</option>
          <option value="pending">Processing</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="flex items-center px-6 py-4 bg-slate-50 rounded-[2rem] w-full lg:w-auto min-w-[200px]">
        <CircleDollarSign size={20} className="text-primary mr-4" />
        <select 
          className="bg-transparent border-none outline-none w-full text-slate-800 font-bold appearance-none cursor-pointer"
          value={filters.priceRange}
          onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
        >
          <option value="all">Any Price</option>
          <option value="0-10000000">Under 10M</option>
          <option value="10000000-30000000">10M - 30M</option>
          <option value="30000000-50000000">30M - 50M</option>
          <option value="50000000+">50M+</option>
        </select>
      </div>

      {/* Action Button */}
      <button 
        onClick={onSearch}
        className="bg-slate-900 text-white p-5 rounded-[2rem] hover:bg-primary transition-all shadow-xl shadow-slate-900/10 w-full lg:w-auto flex items-center justify-center group"
      >
        <Search size={24} className="group-hover:scale-110 transition-transform" />
        <span className="ml-3 font-black uppercase tracking-widest text-xs lg:hidden">Search Properties</span>
      </button>
    </motion.div>
  );
};

export default SearchBar;
