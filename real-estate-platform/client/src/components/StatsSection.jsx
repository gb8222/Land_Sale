import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { label: "Houses Sold", value: "10+", id: "houses" },
    { label: "Lands Sold", value: "10+", id: "lands" },
    { label: "Ongoing Projects", value: "2+", id: "projects" },
    { label: "Years Experience", value: "10+", id: "experience" },
  ];

  return (
    <section className="relative z-20 -mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col items-center text-center group hover:bg-primary transition-colors duration-500"
            >
              <div className="text-4xl lg:text-5xl font-black text-primary group-hover:text-white transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-primary-200 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
