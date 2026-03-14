import { motion } from "framer-motion";
import { UserCheck, FileText, HandCoins, Construction, CheckCircle2 } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    { title: "Trusted Property Developer", icon: UserCheck, desc: "A decade of excellence in Negombo's real estate." },
    { title: "Legal Documentation Provided", icon: FileText, desc: "100% verified clear title deeds for peace of mind." },
    { title: "Bank Loan Assistance", icon: HandCoins, desc: "We guide you from visit to bank approval." },
    { title: "Quality Construction", icon: Construction, desc: "Superior materials and landmark architectural design." },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Our Commitment</span>
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                WHY CHOOSE <br />
                <span className="text-primary/10 stroke-slate-900 stroke-2 uppercase">DHAMMIKA RESIDENCE?</span>
              </h2>
            </div>
            
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              We bring unparalleled trust, precision, and quality to every project we undertake, 
              ensuring your investment is secure and your future home is perfect.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-4 group">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-primary/10">
                    <benefit.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">{benefit.title}</h4>
                    <p className="text-slate-500 text-sm font-medium mt-1">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1000&q=80" 
                alt="High quality construction"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary p-12 rounded-[2.5rem] shadow-2xl hidden md:block">
              <CheckCircle2 className="text-white w-20 h-20 mb-4" />
              <div className="text-white">
                <div className="text-4xl font-black tracking-tighter leading-none">100%</div>
                <div className="text-xs font-bold uppercase tracking-widest mt-1 opacity-70">Satisfied Clients</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
