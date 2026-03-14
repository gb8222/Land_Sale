import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { CheckCircle2, Target, Eye, Users, Award, ShieldCheck, HeartHandshake } from "lucide-react";

const About = () => {
  const coreValues = [
    { title: "Legal Expertise", desc: "100% verified clear title deeds for every square inch.", icon: ShieldCheck },
    { title: "Quality Control", desc: "Superior materials and landmark architectural design standards.", icon: Award },
    { title: "Customer Centric", desc: "We guide you from site visit to bank loan approval.", icon: HeartHandshake },
    { title: "Market Growth", desc: "Strategically located properties for high investment returns.", icon: Users }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-40 overflow-hidden">
      <SEO title="Our Legacy & Vision | DHAMMIKA RESIDENCE" description="Founded on integrity and architectural excellence, DHAMMIKA RESIDENCE has redefined the Negombo real estate landscape for over a decade." />
      
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto mb-32 space-y-8"
        >
          <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em]">
            <span>Est. 2014</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] italic uppercase">
            A LEGACY OF <br /><span className="text-primary/10 stroke-slate-900 stroke-2 non-italic">UNWAVERING TRUST</span>
          </h1>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto border-b-2 border-slate-200 pb-12">
            Founded on the principles of integrity and architectural excellence, DHAMMIKA RESIDENCE has 
            transformed the real estate landscape in Negombo for over a decade.
          </p>
        </motion.div>

        {/* Vision/Mission Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="p-16 rounded-[4rem] bg-slate-900 text-white space-y-8 relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <Target size={40} />
            </div>
            <h3 className="text-5xl font-black italic tracking-tighter uppercase">Our Mission</h3>
            <p className="text-slate-400 text-xl leading-relaxed font-medium">
              To provide high-quality, legal, and sustainable housing solutions 
              while ensuring absolute peace of mind for our clients through transparent documentation 
              and superior construction.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="p-16 rounded-[4rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200 space-y-8 relative overflow-hidden group"
          >
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
            <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <Eye size={40} />
            </div>
            <h3 className="text-5xl font-black italic tracking-tighter uppercase text-slate-900">Our Vision</h3>
            <p className="text-slate-500 text-xl leading-relaxed font-medium">
              To be the most trusted and innovative real estate developing firm in Sri Lanka, 
              recognized for creating landmark destinations that redefine modern living standards.
            </p>
          </motion.div>
        </div>

        {/* Global Standards Grid */}
        <div className="space-y-24">
          <div className="text-center space-y-4">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Our Pillars</span>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic">GLOBAL STANDARDS, LOCAL HEART.</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {coreValues.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6 p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary/20 transition-all shadow-xl shadow-slate-200/50 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <item.icon size={28} />
                </div>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{item.title}</h4>
                <p className="text-slate-500 text-base font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
