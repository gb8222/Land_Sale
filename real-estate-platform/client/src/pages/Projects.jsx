import { useEffect, useState } from "react";
import api from "../lib/api";
import PropertyCard from "../components/PropertyCard";
import SEO from "../components/SEO";
import { Hammer, Construction, ArrowUpRight, Zap, ShieldCheck, Gem } from "lucide-react";
import { motion } from "framer-motion";

const Projects = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/properties");
        // Filter for processing/pending status
        setProperties(response.data.filter(p => p.status === 'processing' || p.status === 'pending'));
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen pt-32 pb-40 text-white overflow-hidden">
      <SEO title="Future Landmarks & Ongoing Projects | DHAMMIKA RESIDENCE" description="Witness the future of Negombo real estate. Explore our ongoing construction projects and secure your sanctuary today." />
      
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-32 flex flex-col lg:flex-row items-center gap-20 justify-between"
        >
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black uppercase tracking-[0.3em]">
              <Construction size={16} className="animate-pulse" />
              <span>Future Landmarks</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black mt-4 mb-6 tracking-tighter leading-[0.85] italic">
              ENGINEERING <br />
              <span className="text-white/10 stroke-white stroke-2 non-italic">EXCELLENCE</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl border-l-4 border-primary pl-8">
              Witness the birth of Negombo's next architectural icons. Our ongoing projects 
              blend sustainable technology with uncompromising luxury.
            </p>
          </div>
          <div className="relative">
              <div className="h-64 w-64 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center text-primary/30 animate-spin-slow">
                  <Hammer size={80} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
              </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-8 text-slate-500 font-black uppercase tracking-[0.4em] text-xs">Accessing Blueprints...</p>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {properties.map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white/5 rounded-[4rem] border border-white/10 shadow-3xl">
             <Construction className="w-24 h-24 text-white/5 mx-auto mb-8" />
             <h3 className="text-4xl font-black text-white italic tracking-tighter">NEW FOUNDATIONS SOON</h3>
             <p className="text-slate-500 mt-4 text-xl font-medium max-w-md mx-auto">
               We are currently finalizing the blueprints for our next major development. 
               Register your interest for early bird access.
             </p>
             <button className="mt-12 btn-premium-primary px-10 py-5">Get Notified First</button>
          </div>
        )}

        {/* Development Philosophy */}
        <div className="mt-40 grid lg:grid-cols-3 gap-16 pt-40 border-t border-white/5">
            {[
              { title: "Eco-Tech Integration", icon: Zap, desc: "Implementing smart grid technology and sustainable irrigation for all land developments." },
              { title: "Legal Safety Shield", icon: ShieldCheck, desc: "Pre-verified clear titles and approved local authority plans for every square inch." },
              { title: "Modern Landmark", icon: Gem, desc: "Architectural concepts that redefine the Negombo skyline with glass and open-air logic." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group space-y-6"
              >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <item.icon size={28} />
                    </div>
                    <h4 className="text-2xl font-black tracking-tighter italic uppercase">{item.title}</h4>
                  </div>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
