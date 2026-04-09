// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  Phone, 
  MapPin, 
  Star, 
  TrendingUp,
  Users,
  BarChart,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Upload,
  Image as ImageIcon,
  Briefcase,
  Mail,
  Lock,
  User,
  Settings,
  LogOut,
  Menu,
  Home,
  List,
  Award,
  Shield
} from "lucide-react";

// Types
interface Business {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  price: string;
  image: string;
  hours: string;
  amenities: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  views: number;
  clicks: number;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
  joinedDate: string;
}

export default function Dashboard() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("business");
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Rajesh Kumar",
    email: "rajesh@business.com",
    phone: "+91 98765 43210",
    company: "LocalBiz Partner",
    joinedDate: new Date().toISOString().split('T')[0]
  });

  // Form state
  const [formData, setFormData] = useState<Partial<Business>>({
    name: "",
    category: "",
    subcategory: "",
    location: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    price: "medium",
    image: "🏪",
    hours: "9:00 AM - 9:00 PM",
    amenities: [],
    tags: []
  });

  const [newAmenity, setNewAmenity] = useState("");
  const [newTag, setNewTag] = useState("");

  const categories = ["Gym", "Salon", "Restaurant", "Grocery", "Services", "Other"];
  const priceRanges = ["low", "medium", "high"];

  // Load businesses from localStorage
  useEffect(() => {
    const savedBusinesses = localStorage.getItem("userBusinesses");
    if (savedBusinesses) {
      setBusinesses(JSON.parse(savedBusinesses));
    } else {
      // Add sample businesses
      const sampleBusinesses: Business[] = [
        {
          id: "1",
          name: "Power Gym & Fitness",
          category: "Gym",
          subcategory: "Fitness Center",
          location: "Sector 18, Noida",
          address: "3rd Floor, Wave Mall, Sector 18, Noida",
          phone: "+919876543210",
          email: "contact@powergym.com",
          website: "www.powergym.com",
          description: "Premium gym with modern equipment",
          price: "medium",
          image: "💪",
          hours: "6:00 AM - 10:00 PM",
          amenities: ["Parking", "WiFi", "Lockers"],
          tags: ["fitness", "gym", "workout"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 234,
          clicks: 89
        },
        {
          id: "2",
          name: "Glamour Salon & Spa",
          category: "Salon",
          subcategory: "Beauty Parlour",
          location: "Sector 62, Noida",
          address: "Shop No. 12, Near Fortis Hospital, Sector 62, Noida",
          phone: "+919876543211",
          email: "info@glamoursalon.com",
          website: "www.glamoursalon.com",
          description: "Luxury salon and spa services",
          price: "high",
          image: "💇",
          hours: "10:00 AM - 8:00 PM",
          amenities: ["AC", "Parking", "WiFi"],
          tags: ["salon", "spa", "beauty"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 189,
          clicks: 67
        }
      ];
      setBusinesses(sampleBusinesses);
      localStorage.setItem("userBusinesses", JSON.stringify(sampleBusinesses));
    }
  }, []);

  // Save to localStorage whenever businesses change
  useEffect(() => {
    if (businesses.length > 0) {
      localStorage.setItem("userBusinesses", JSON.stringify(businesses));
    }
  }, [businesses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBusiness) {
      // Update existing business - don't include id in formData spread
      const updatedBusinesses = businesses.map(business => 
        business.id === editingBusiness.id 
          ? { 
              ...business, 
              name: formData.name || business.name,
              category: formData.category || business.category,
              subcategory: formData.subcategory || business.subcategory,
              location: formData.location || business.location,
              address: formData.address || business.address,
              phone: formData.phone || business.phone,
              email: formData.email || business.email,
              website: formData.website || business.website,
              description: formData.description || business.description,
              price: formData.price || business.price,
              image: formData.image || business.image,
              hours: formData.hours || business.hours,
              amenities: formData.amenities || business.amenities,
              tags: formData.tags || business.tags,
              updatedAt: new Date().toISOString()
            } as Business
          : business
      );
      setBusinesses(updatedBusinesses);
      alert("Business updated successfully!");
    } else {
      // Add new business - ensure id is only defined once
      const { id, ...formDataWithoutId } = formData;
      const newBusiness: Business = {
        id: Date.now().toString(),
        name: formData.name || "",
        category: formData.category || "",
        subcategory: formData.subcategory || "",
        location: formData.location || "",
        address: formData.address || "",
        phone: formData.phone || "",
        email: formData.email || "",
        website: formData.website || "",
        description: formData.description || "",
        price: formData.price || "medium",
        image: formData.image || "🏪",
        hours: formData.hours || "9:00 AM - 9:00 PM",
        amenities: formData.amenities || [],
        tags: formData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        clicks: 0
      };
      setBusinesses([...businesses, newBusiness]);
      alert("Business added successfully!");
    }
    
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this business? This action cannot be undone!")) {
      const updatedBusinesses = businesses.filter(business => business.id !== id);
      setBusinesses(updatedBusinesses);
      alert("Business deleted successfully!");
    }
  };

  const handleEdit = (business: Business) => {
    setEditingBusiness(business);
    setFormData(business);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingBusiness(null);
    setFormData({
      name: "",
      category: "",
      subcategory: "",
      location: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      description: "",
      price: "medium",
      image: "🏪",
      hours: "9:00 AM - 9:00 PM",
      amenities: [],
      tags: []
    });
    setNewAmenity("");
    setNewTag("");
  };

  const addAmenity = () => {
    if (newAmenity && !formData.amenities?.includes(newAmenity)) {
      setFormData({
        ...formData,
        amenities: [...(formData.amenities || []), newAmenity]
      });
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities?.filter(a => a !== amenity)
    });
  };

  const addTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag]
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag)
    });
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalViews = businesses.reduce((sum, b) => sum + (b.views || 0), 0);
  const totalClicks = businesses.reduce((sum, b) => sum + (b.clicks || 0), 0);
  const popularBusiness = businesses.length > 0 ? [...businesses].sort((a, b) => (b.views || 0) - (a.views || 0))[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 z-30 ${showSidebar ? 'w-64' : 'w-20'}`}>
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          {showSidebar && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-gray-700 rounded-lg">
            <Menu size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <button onClick={() => setActiveTab("business")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "business" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <Briefcase size={20} />
            {showSidebar && <span>My Businesses</span>}
          </button>
          <button onClick={() => setActiveTab("analytics")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "analytics" ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <BarChart size={20} />
            {showSidebar && <span>Analytics</span>}
          </button>
          <button onClick={() => setShowProfile(true)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${showProfile ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
            <User size={20} />
            {showSidebar && <span>Profile</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-20'}`}>
        
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeTab === "business" && "My Businesses"}
                  {activeTab === "analytics" && "Analytics Dashboard"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your listings, track performance, and grow your business
                </p>
              </div>
              {activeTab === "business" && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus size={20} />
                  Add Business
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Business Management Tab */}
          {activeTab === "business" && (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search businesses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Businesses</p>
                      <p className="text-3xl font-bold mt-2">{businesses.length}</p>
                    </div>
                    <Briefcase size={40} className="opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Views</p>
                      <p className="text-3xl font-bold mt-2">{totalViews}</p>
                    </div>
                    <Eye size={40} className="opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Clicks</p>
                      <p className="text-3xl font-bold mt-2">{totalClicks}</p>
                    </div>
                    <Phone size={40} className="opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Active Listings</p>
                      <p className="text-3xl font-bold mt-2">{businesses.filter(b => b.name).length}</p>
                    </div>
                    <CheckCircle size={40} className="opacity-50" />
                  </div>
                </div>
              </div>

              {/* Businesses List */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBusinesses.map((business) => (
                        <tr key={business.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-2xl mr-3">{business.image}</div>
                              <div>
                                <div className="font-medium text-gray-900">{business.name}</div>
                                <div className="text-sm text-gray-500">{business.subcategory}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {business.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {business.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {business.views || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(business)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(business.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredBusinesses.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses found</h3>
                    <p className="text-gray-500">Add your first business to get started</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-blue-600" />
                    Top Performing Business
                  </h3>
                  {popularBusiness ? (
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{popularBusiness.image}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{popularBusiness.name}</p>
                          <p className="text-sm text-gray-500">{popularBusiness.category}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{popularBusiness.views || 0}</p>
                          <p className="text-sm text-gray-600">Total Views</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{popularBusiness.clicks || 0}</p>
                          <p className="text-sm text-gray-600">Total Clicks</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No data available</p>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users size={20} className="text-purple-600" />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Total Businesses</span>
                      <span className="font-semibold text-lg">{businesses.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Total Categories</span>
                      <span className="font-semibold text-lg">{new Set(businesses.map(b => b.category)).size}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Conversion Rate</span>
                      <span className="font-semibold text-lg">
                        {totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                <div className="space-y-3">
                  {categories.map(cat => {
                    const count = businesses.filter(b => b.category === cat).length;
                    if (count === 0) return null;
                    const percentage = (count / businesses.length) * 100;
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cat}</span>
                          <span>{count} businesses ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Business Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingBusiness ? "Edit Business" : "Add New Business"}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Location/Area *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-1">Full Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Price Range</label>
                  <select
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Budget ($)</option>
                    <option value="medium">Moderate ($$)</option>
                    <option value="high">Premium ($$$)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Business Hours</label>
                  <input
                    type="text"
                    value={formData.hours}
                    onChange={(e) => setFormData({...formData, hours: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-1">Amenities</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      placeholder="Add amenity"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" onClick={addAmenity} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities?.map((amenity, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 rounded-lg text-sm flex items-center gap-1">
                        {amenity}
                        <button type="button" onClick={() => removeAmenity(amenity)} className="text-red-500 hover:text-red-700">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-1">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="button" onClick={addTag} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags?.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center gap-1">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-red-500 hover:text-red-700">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  {editingBusiness ? "Update Business" : "Add Business"}
                </button>
                <button type="button" onClick={resetForm} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Profile</h2>
                <button onClick={() => setShowProfile(false)} className="p-2 hover:bg-white/20 rounded-lg">
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-4xl">
                  👤
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="font-semibold text-gray-900">{userProfile.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email Address</label>
                  <p className="font-semibold text-gray-900">{userProfile.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <p className="font-semibold text-gray-900">{userProfile.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Company</label>
                  <p className="font-semibold text-gray-900">{userProfile.company}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Member Since</label>
                  <p className="font-semibold text-gray-900">{userProfile.joinedDate}</p>
                </div>
              </div>
              <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}