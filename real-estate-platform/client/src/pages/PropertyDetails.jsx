import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../lib/api";
import SEO from "../components/SEO";
import PropertyGallery from "../components/PropertyGallery";
import { 
  MapPin, BedDouble, Bath, Square, Phone, MessageCircle, 
  ChevronLeft, Share2, Heart, ShieldCheck, Home, Info, Plus, CheckCircle, Tag, Building2
} from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!property) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Property Not Found</h2>
      <Link to="/properties" className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl font-black uppercase tracking-widest text-xs">Back to Listings</Link>
    </div>
  );

  const phoneNumber = "94773302930"; // Can be dynamic from property or site config
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Hi DHAMMIKA RESIDENCE, I'm interested in the property: ${property.title}`)}`;

  return (
    <div className="bg-slate-50 min-h-screen pb-32 overflow-x-hidden">
      <SEO 
        title={`${property.title} | DHAMMIKA RESIDENCE Real Estate`} 
        description={`View details for ${property.title} located in ${property.city}. ${property.description?.substring(0, 150)}...`} 
      />

      {/* Premium Gallery Header */}
      <div className="container mx-auto px-6 pt-12">
          {/* Back Navigation */}
          <div className="mb-8 flex items-center justify-between">
              <Link to="/properties" className="group flex items-center space-x-2 text-slate-400 hover:text-primary transition-all font-black uppercase tracking-widest text-xs">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform border border-slate-100">
                      <ChevronLeft size={18} />
                  </div>
                  <span>Return to Portfolio</span>
              </Link>
              <div className="flex space-x-3">
                  <button className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 hover:text-rose-500 hover:shadow-rose-100 transition-all border border-slate-100">
                      <Heart size={20} />
                  </button>
                  <button className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-primary/10 transition-all border border-slate-100">
                      <Share2 size={20} />
                  </button>
              </div>
          </div>

          <PropertyGallery 
            images={property.images || []} 
            status={property.status} 
            type={property.type} 
          />
      </div>

      <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-start">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-24">
                  
                  {/* Title & Stats Card */}
                  <div className="space-y-12">
                      <div className="space-y-4">
                          <div className="flex items-center text-primary font-black uppercase tracking-[0.3em] text-xs">
                              <MapPin size={16} className="mr-2" />
                              <span>{property.city ? `${property.city} | ${property.location}` : property.location}</span>
                          </div>
                          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                              {property.title}
                          </h1>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 group hover:bg-primary transition-all duration-500">
                               <Square className="text-primary group-hover:text-white mb-6 transition-colors" size={32} />
                               <span className="text-[10px] font-black text-slate-400 group-hover:text-white/60 uppercase tracking-widest block mb-1">Land Size</span>
                               <span className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors">{property.landSize || property.size} Perch</span>
                           </div>
                           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 group hover:bg-primary transition-all duration-500">
                               <Tag className="text-primary group-hover:text-white mb-6 transition-colors" size={32} />
                               <span className="text-[10px] font-black text-slate-400 group-hover:text-white/60 uppercase tracking-widest block mb-1">Type</span>
                               <span className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors capitalize">{property.type}</span>
                           </div>
                           {property.bedrooms && (
                               <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 group hover:bg-primary transition-all duration-500">
                                   <BedDouble className="text-primary group-hover:text-white mb-6 transition-colors" size={32} />
                                   <span className="text-[10px] font-black text-slate-400 group-hover:text-white/60 uppercase tracking-widest block mb-1">Bedrooms</span>
                                   <span className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors">{property.bedrooms}</span>
                               </div>
                           )}
                           {property.bathrooms && (
                               <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 group hover:bg-primary transition-all duration-500">
                                   <Bath className="text-primary group-hover:text-white mb-6 transition-colors" size={32} />
                                   <span className="text-[10px] font-black text-slate-400 group-hover:text-white/60 uppercase tracking-widest block mb-1">Bathrooms</span>
                                   <span className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors">{property.bathrooms}</span>
                               </div>
                           )}
                      </div>
                  </div>

                  {/* Description Section */}
                  <div className="space-y-8">
                      <div className="flex items-center space-x-4 border-l-4 border-primary pl-6">
                           <h3 className="text-4xl font-black text-slate-900 italic tracking-tight uppercase">Development Narrative</h3>
                      </div>
                      <p className="text-xl text-slate-500 leading-relaxed font-medium whitespace-pre-wrap">
                          {property.description}
                      </p>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-12">
                       <h3 className="text-3xl font-black text-slate-900 tracking-tight flex items-center">
                           <ShieldCheck size={32} className="mr-4 text-emerald-500" />
                           PREMIUM SPECIFICATIONS
                       </h3>
                       <div className="grid sm:grid-cols-2 gap-6">
                            {(property.features || [
                              "Clear Title & Deeds",
                              "Architecturally Designed",
                              "Premium Neighborhood",
                              "Waste Management System",
                              "3-Phase Electricity Ready",
                              "Main Water Connection"
                            ]).map((spec, i) => (
                                <div key={i} className="flex items-center space-x-4 bg-white p-6 rounded-3xl border border-slate-50 shadow-sm group hover:border-primary/20 transition-all">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-sm font-black text-slate-700 uppercase tracking-widest">{spec}</span>
                                </div>
                            ))}
                       </div>
                  </div>

                  {/* Location Map */}
                  <div className="space-y-8">
                       <div className="flex items-center justify-between">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Geographical Intelligence</h3>
                            <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-primary transition-all">Open Satellite View</button>
                       </div>
                       <div className="h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white group">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15830.490547055728!2d79.84581457173872!3d7.209673994326528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2ee9c05af3f7d%3A0x56de4636952ca30!2sNegombo!5e0!3m2!1sen!2slk!4v1710420000000!5m2!1sen!2slk" 
                                className="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                            ></iframe>
                       </div>
                  </div>
              </div>

              {/* Sticky Action Sidebar */}
              <div className="sticky top-40 space-y-8">
                  <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-50 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-6">Investment Value</span>
                      <div className="text-5xl font-black text-slate-900 italic tracking-tighter mb-12">
                          <span className="text-primary text-xl uppercase not-italic mr-2">Rs.</span>
                          {Number(property.price).toLocaleString()}
                      </div>
                      
                      <div className="space-y-4">
                          <a href={`tel:${phoneNumber}`} className="w-full bg-slate-900 text-white rounded-[2rem] py-6 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-primary transition-all shadow-xl shadow-slate-900/10">
                              <Phone size={18} />
                              <span>Direct Consultation</span>
                          </a>
                          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-emerald-600 text-white rounded-[2rem] py-6 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/10">
                              <MessageCircle size={18} />
                              <span>WhatsApp Enquiry</span>
                          </a>
                      </div>

                      <div className="mt-12 pt-12 border-t border-slate-100 flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary border border-slate-100">
                              <Info size={24} />
                          </div>
                          <div>
                              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Available 24/7</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Professional Concierge</p>
                          </div>
                      </div>
                  </div>

                  <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden group">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all"></div>
                      <Building2 className="text-primary mb-6" size={32} />
                      <h4 className="text-2xl font-black tracking-tighter mb-4 italic leading-none">SECURE YOUR <br />INVESTMENT</h4>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed">Schedule a private site visit with our senior consultants to experience this property in person.</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
