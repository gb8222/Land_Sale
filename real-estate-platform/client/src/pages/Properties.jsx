import { useEffect, useState } from "react";
import api from "../lib/api";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import SEO from "../components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Ban } from "lucide-react";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    status: "all",
    priceRange: "all"
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await api.get("/properties");
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let result = properties;

    // Location filter
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter(p => 
        p.location.toLowerCase().includes(loc) || 
        (p.city && p.city.toLowerCase().includes(loc)) ||
        p.title.toLowerCase().includes(loc)
      );
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter(p => p.status === filters.status);
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.replace('+', '').split('-').map(Number);
      if (filters.priceRange.includes('+')) {
        result = result.filter(p => p.price >= 50000000);
      } else {
        result = result.filter(p => p.price >= min && p.price <= max);
      }
    }

    setFilteredProperties(result);
  };

  // Trigger search when filters change (de-bounced effect or just on change for better UX)
  useEffect(() => {
    handleSearch();
  }, [filters, properties]);

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <SEO title="Explore Premium Properties | DHAMMIKA RESIDENCE" />

      {/* Header Section */}
      <section className="bg-slate-900 pt-32 pb-40 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/10 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Curated Portfolio</span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic">FIND YOUR SANCTUARY</h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Discover a diverse range of premium houses and prime lands in Negombo, 
              expertly curated for the discerning investor.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-slate-50 translate-y-px"></div>
      </section>

      {/* Search Bar Container */}
      <div className="container mx-auto px-6">
        <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-6 mt-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-6 text-slate-400 font-black uppercase tracking-widest text-xs">Scanning Database...</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredProperties.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
              >
                {filteredProperties.map((property, idx) => (
                  <motion.div
                    layout
                    key={property.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
              >
                <Ban className="w-20 h-20 text-slate-200 mx-auto mb-6" />
                <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">No Matches Found</h3>
                <p className="text-slate-500 mt-2 font-medium max-w-sm mx-auto">
                  Adjust your search parameters to explore other premium opportunities in our portfolio.
                </p>
                <button 
                  onClick={() => setFilters({ location: "", status: "all", priceRange: "all" })}
                  className="mt-8 btn-premium-primary px-8 py-4"
                >
                  Reset Discovery
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Properties;