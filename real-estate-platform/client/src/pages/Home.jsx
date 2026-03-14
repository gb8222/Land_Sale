import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../lib/api";
import PropertyCard from "../components/PropertyCard";
import SEO from "../components/SEO";
import StatsSection from "../components/StatsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import { ArrowRight } from "lucide-react";

import logo from "../assets/logo/dhammika-residence-logo.png";

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/properties");
        setFeaturedProperties(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Premium Real Estate & Land Developers | DHAMMIKA RESIDENCE"
        description="DHAMMIKA RESIDENCE is a leading real estate developer in Negombo, Sri Lanka. Specializing in luxury houses, prime lands, and ongoing construction projects."
      />

      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[750px] flex items-center">
        <div className="absolute inset-0 z-0 text-white">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
            alt="DHAMMIKA RESIDENCE Premium Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-10"
          >
            <div className="inline-flex items-center space-x-4 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src={logo} alt="Logo" className="h-10 w-auto relative z-10" />
              <div className="flex flex-col relative z-10">
                <span className="text-xs font-black uppercase tracking-[0.3em]">DHAMMIKA RESIDENCE</span>
                <span className="text-[8px] font-bold text-primary tracking-widest uppercase">Premium Houses & Lands</span>
              </div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter"
            >
              ELEVATING <br />
              <span className="text-primary-300">MODERN</span> LIVING
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-2xl text-slate-200 leading-relaxed max-w-2xl font-medium border-l-4 border-accent pl-8"
            >
              At DHAMMIKA RESIDENCE, we don't just build structures; we craft sanctuaries that 
              define the pinnacle of Sri Lankan architecture and lifestyle.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-6 pt-6"
            >
              <Link 
                to="/properties" 
                className="btn-premium-primary px-10 py-5 text-lg w-full sm:w-auto shadow-2xl shadow-primary/40 flex items-center justify-center gap-3"
              >
                View Properties
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Statistics Section */}
      <StatsSection />

      {/* Featured Properties Selection */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Premium Selection</span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-none tracking-tight">FEATURED PROPERTIES</h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">
                Explore our handpicked collection of properties that represent the absolute best 
                in design, location, and value.
              </p>
            </div>
            <Link 
              to="/properties" 
              className="group flex items-center space-x-3 text-slate-900 font-black uppercase tracking-widest text-sm hover:text-primary transition-colors border-b-2 border-slate-900 pb-2"
            >
              <span>Explore All Listings</span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform h-5 w-5" />
            </Link>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {featuredProperties.map((property, idx) => (
                <motion.div 
                  key={property.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-xl font-medium italic">Curating your next masterpiece...</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-slate-900 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 to-transparent opacity-50"></div>
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
                READY TO FIND YOUR <br />
                <span className="text-primary-300 font-bold italic serif">DREAM HOME?</span>
              </h2>
              <p className="text-xl text-slate-400 font-medium tracking-wide">
                Join hundreds of families who found their sanctuary with DHAMMIKA RESIDENCE.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <Link to="/properties" className="btn-premium-primary px-12 py-5 text-xl">
                  Browse Properties
                </Link>
                <Link to="/projects" className="btn-premium-outline border-slate-700 text-white hover:bg-white hover:text-slate-900 px-12 py-5 text-xl">
                  Ongoing Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;