import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload, X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "house",
    status: "active",
    price: "",
    location: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    landSize: "",
    houseSize: "",
    featured: false,
    mapLink: "",
    contactNumber: "",
    whatsappNumber: "",
    features: "",
    images: []
  });

  useEffect(() => {
    if (isEdit) {
      const fetchProperty = async () => {
        try {
          const res = await api.get(`/properties/${id}`);
          const data = res.data;
          setFormData({
            ...data,
            features: Array.isArray(data.features) ? data.features.join(", ") : (data.features || "")
          });
        } catch (error) {
          toast.error("Failed to fetch property details");
        }
      };
      fetchProperty();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const fileRef = ref(storage, `properties/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        uploadedUrls.push(url);
      }
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        features: typeof formData.features === 'string' 
          ? formData.features.split(',').map(f => f.trim()).filter(f => f !== "")
          : formData.features
      };

      if (isEdit) {
        await api.put(`/properties/${id}`, dataToSubmit);
        toast.success("Property updated successfully");
      } else {
        await api.post("/properties", dataToSubmit);
        toast.success("Property added successfully");
      }
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl fade-in">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-3 italic">
            {isEdit ? "Edit Property" : "Add New Property"}
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            {isEdit ? "Update your property listing with the latest information" : "Bring your property to the market with a premium listing"}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            type="button" 
            onClick={() => navigate("/admin")}
            className="btn-premium-outline px-8"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="property-form"
            disabled={loading || uploading}
            className="btn-premium-primary px-10"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> {isEdit ? "Update Listing" : "Publish Listing"}</>}
          </button>
        </div>
      </div>

      <form id="property-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Information */}
          <div className="form-card form-card-accent">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 text-primary rounded-lg">
                <ImageIcon size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">General Information</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="label-premium">Property Title</label>
                <input 
                  name="title" 
                  required 
                  className="input-field-premium" 
                  placeholder="e.g. Modern 4-Bedroom Villa in Kandy" 
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="label-premium">Property Type</label>
                  <select name="type" className="input-field-premium" value={formData.type} onChange={handleChange}>
                    <option value="house">🏠 House</option>
                    <option value="land">🏞️ Land</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="label-premium">Listing Status</label>
                  <select name="status" className="input-field-premium" value={formData.status} onChange={handleChange}>
                    <option value="active">🟢 Active</option>
                    <option value="pending">🟡 Pending</option>
                    <option value="sold">🔴 Sold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="label-premium">Price (LKR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rs.</span>
                    <input 
                      name="price" 
                      type="number" 
                      required 
                      className="input-field-premium pl-12" 
                      placeholder="25,000,000" 
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="label-premium">City / District</label>
                  <input 
                    name="city" 
                    required 
                    className="input-field-premium" 
                    placeholder="e.g. Colombo, Kandy" 
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="label-premium">Area / Address</label>
                  <input 
                    name="location" 
                    required 
                    className="input-field-premium" 
                    placeholder="e.g. Thalawathugoda" 
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="label-premium">Description</label>
                <textarea 
                  name="description" 
                  rows="6" 
                  required 
                  className="input-field-premium min-h-[150px] resize-none" 
                  placeholder="Provide a detailed and captivating description..." 
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label className="label-premium">Property Features</label>
                <textarea 
                  name="features" 
                  rows="3" 
                  className="input-field-premium min-h-[100px] resize-none text-sm" 
                  placeholder="e.g. Garden, Swimming Pool, Car Parking, 24/7 Security" 
                  value={formData.features}
                  onChange={handleChange}
                />
                <p className="text-[10px] text-slate-400 font-medium">Separate features with commas</p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="form-card">
            <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-50">Property Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="label-premium">Land Area</label>
                <input 
                  name="landSize" 
                  className="input-field-premium" 
                  placeholder="e.g. 15 Perches" 
                  value={formData.landSize}
                  onChange={handleChange}
                />
              </div>
              {formData.type === "house" && (
                <div className="space-y-1">
                  <label className="label-premium">Floor Area</label>
                  <input 
                    name="houseSize" 
                    className="input-field-premium" 
                    placeholder="e.g. 2500 Sq Ft" 
                    value={formData.houseSize}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            {formData.type === "house" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-1">
                  <label className="label-premium">Bedrooms</label>
                  <input 
                    name="bedrooms" 
                    type="number" 
                    className="input-field-premium" 
                    placeholder="0"
                    value={formData.bedrooms}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="label-premium">Bathrooms</label>
                  <input 
                    name="bathrooms" 
                    type="number" 
                    className="input-field-premium" 
                    placeholder="0"
                    value={formData.bathrooms}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50 group cursor-pointer transition-all hover:bg-blue-50">
              <div className="relative flex items-center">
                <input 
                  name="featured" 
                  type="checkbox" 
                  id="featured"
                  className="peer w-6 h-6 rounded-lg text-primary border-slate-300 focus:ring-primary/20 transition-all cursor-pointer"
                  checked={formData.featured}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="featured" className="text-base font-bold text-slate-700 cursor-pointer select-none">
                Promote as Featured Property
                <span className="block text-xs font-medium text-slate-400 mt-0.5">Will be displayed on the home page showcase</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Photos */}
          <div className="form-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Property Photos</h3>
              <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full">{formData.images.length} images</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group shadow-sm">
                  <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button" 
                      onClick={() => removeImage(idx)}
                      className="p-2 bg-red-500 text-white rounded-xl transform hover:scale-110 transition-transform"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
              
              <label className="image-upload-zone">
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin text-primary" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-slate-100 text-slate-400 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Upload size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-3 group-hover:text-primary transition-colors">Add Photo</span>
                  </>
                )}
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
          </div>

          {/* Contact & Map */}
          <div className="form-card">
            <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-50">Connections</h3>
            
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="label-premium">Contact Number</label>
                <input 
                  name="contactNumber" 
                  required 
                  className="input-field-premium" 
                  placeholder="+94 77 ..." 
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="label-premium">WhatsApp Number</label>
                <input 
                  name="whatsappNumber" 
                  required 
                  className="input-field-premium" 
                  placeholder="+94 77 ..." 
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1 pt-4 border-t border-slate-50">
                <label className="label-premium">Google Maps URL</label>
                <input 
                  name="mapLink" 
                  className="input-field-premium" 
                  placeholder="Paste URL here..." 
                  value={formData.mapLink}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-900/10">
            <h4 className="font-bold text-lg mb-2">Pro Tip ✨</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              High-quality photos and clear descriptions increase buyer interest by over <span className="text-white font-bold">40%</span>. Make sure to include all key amenities.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
