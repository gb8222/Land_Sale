import { useEffect, useState } from "react";
import api from "../lib/api";
import PropertyCard from "../components/PropertyCard";
import SEO from "../components/SEO";
import { Ban, CheckCircle2, History, TrendingUp, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const SoldProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/properties");
        setProperties(response.data.filter(p => p.status === 'sold'));
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-40 overflow-hidden">
      <SEO title="Sold Properties Archive | DHAMMIKA RESIDENCE" description="A legacy of excellence. View successfully completed real estate transactions by DHAMMIKA RESIDENCE in Negombo." />
      
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32 text-center max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em]">
            <Trophy size={16} />
            <span>A Legacy of Trust</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
            SUCCESS <br /><span className="text-primary/10 stroke-slate-900 stroke-2">ARCHIVES</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed border-b-2 border-slate-200 pb-12">
            Every sold property represents a dream fulfilled and a secure investment made. 
            Explore the landmarks that define our track record.
          </p>

          <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                  <div className="text-3xl font-black text-slate-900 tracking-tighter leading-none">10+</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Homes Delivered</div>
              </div>
              <div className="text-center border-x border-slate-200">
                  <div className="text-3xl font-black text-slate-900 tracking-tighter leading-none">100%</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Clear Titles</div>
              </div>
              <div className="text-center">
                  <div className="text-3xl font-black text-slate-900 tracking-tighter leading-none">10Yrs</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Experience</div>
              </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-8 text-slate-400 font-bold uppercase tracking-widest text-xs">Curating Archives...</p>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {properties.map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[4rem] shadow-2xl shadow-slate-200 border border-slate-100">
             <History className="w-20 h-20 text-slate-200 mx-auto mb-8" />
             <h3 className="text-3xl font-black text-slate-800 italic uppercase">Archives Updating</h3>
             <p className="text-slate-400 mt-4 text-xl font-medium max-w-md mx-auto">
               We are currently cataloging our latest successful transactions. 
               Check back shortly for new additions.
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoldProperties;
