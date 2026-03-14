import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import toast from "react-hot-toast";
import { 
  Building2, Plus, Search, Edit2, Trash2, Eye, 
  LayoutDashboard, TrendingUp, Users, CheckCircle, Clock, MapPin
} from "lucide-react";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get("/properties");
      setProperties(response.data);
    } catch (error) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/properties/${id}`);
      toast.success("Property removed successfully");
      await fetchProperties();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.response?.data?.message || "Failed to delete property");
    } finally {
      setLoading(false);
      setDeletingId(null);
    }
  };

  const filteredProperties = properties.filter(p => 
    (p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.location && p.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.city && p.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = [
    { label: "Total Listings", value: properties.length, icon: Building2, color: "text-primary bg-primary/10" },
    { label: "Active Deals", value: properties.filter(p => p.status === 'active').length, icon: TrendingUp, color: "text-emerald-500 bg-emerald-50" },
    { label: "Pending", value: properties.filter(p => p.status === 'pending').length, icon: Clock, color: "text-amber-500 bg-amber-50" },
    { label: "Sold Out", value: properties.filter(p => p.status === 'sold').length, icon: CheckCircle, color: "text-slate-500 bg-slate-100" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 fade-in">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 flex items-center">
              <LayoutDashboard className="w-8 h-8 mr-3 text-primary" />
              Management Dashboard
            </h1>
            <p className="text-slate-500 font-medium ml-11">Monitor and manage your premium real estate portfolio</p>
          </div>
          <Link to="/admin/add" className="btn-premium-primary inline-flex items-center space-x-2 px-8 py-3 shadow-xl shadow-primary/20">
            <Plus className="w-5 h-5" />
            <span>Add New Property</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-premium border border-slate-100 flex items-center space-x-4 animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table/List View */}
        <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900">Property Inventory</h3>
            <div className="relative group max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="input-field-premium pl-10 py-2.5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5">Property Details</th>
                  <th className="px-8 py-5">Type</th>
                  <th className="px-8 py-5">Value</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-20 text-slate-400 font-medium italic">Accessing secure database...</td></tr>
                ) : filteredProperties.length > 0 ? (
                  filteredProperties.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <img src={p.images?.[0]} className="w-14 h-14 rounded-xl object-cover shadow-sm" alt="" />
                          <div>
                            <p className="font-bold text-slate-900 line-clamp-1">{p.title || "Untitled Property"}</p>
                            <p className="text-sm text-slate-400 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {p.city ? `${p.city}, ${p.location || ""}` : (p.location || "No Location")}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 capitalize font-bold text-slate-600">{p.type}</td>
                      <td className="px-8 py-6 font-black text-primary">Rs. {Number(p.price).toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${
                          p.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          p.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="inline-flex items-center bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
                          <Link to={`/properties/${p.id}`} className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-white rounded-xl shadow-sm">
                            <Eye className="w-5 h-5" />
                          </Link>
                          <Link to={`/admin/edit/${p.id}`} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors hover:bg-white rounded-xl shadow-sm mx-1">
                            <Edit2 className="w-5 h-5" />
                          </Link>
                          {deletingId === p.id ? (
                            <div className="p-2">
                              <div className="w-5 h-5 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                            </div>
                          ) : (
                            <button 
                              type="button"
                              onClick={() => setDeletingId(p.id)} 
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-white rounded-xl shadow-sm"
                              title="Delete Property"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                        {deletingId === p.id && (
                          <div className="absolute right-0 top-full mt-2 z-50 bg-white shadow-2xl rounded-2xl p-4 border border-slate-100 min-w-[200px] animate-fadeIn">
                             <p className="text-xs font-bold text-slate-900 mb-3">Delete this listing permanently?</p>
                             <div className="flex gap-2">
                               <button 
                                 onClick={() => handleDelete(p.id)}
                                 className="flex-1 bg-red-500 text-white text-[10px] font-black uppercase py-2 rounded-lg hover:bg-red-600 transition-colors"
                               >
                                 Confirm
                               </button>
                               <button 
                                 onClick={() => setDeletingId(null)}
                                 className="flex-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase py-2 rounded-lg hover:bg-slate-200 transition-colors"
                               >
                                 Cancel
                               </button>
                             </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="text-center py-20 text-slate-400 font-bold">No properties found in inventory</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;