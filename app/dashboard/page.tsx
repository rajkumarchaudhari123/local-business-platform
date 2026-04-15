// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Eye,
  Phone,
  BarChart,
  Clock,
  CheckCircle,
  Search,
  Briefcase,
  User,
  Menu,
  TrendingUp,
  Users,
  ChevronLeft,
  Grid,
  List,
  Filter
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
  const [showSidebar, setShowSidebar] = useState(false); // Start closed on mobile
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [userProfile] = useState<UserProfile>({
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

  // Load businesses from localStorage
  useEffect(() => {
    const savedBusinesses = localStorage.getItem("userBusinesses");
    if (savedBusinesses) {
      setBusinesses(JSON.parse(savedBusinesses));
    } else {
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

  useEffect(() => {
    if (businesses.length > 0) {
      localStorage.setItem("userBusinesses", JSON.stringify(businesses));
    }
  }, [businesses]);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showSidebar && window.innerWidth < 768) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setShowSidebar(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSidebar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBusiness) {
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
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowSidebar(false)} />
      )}

      {/* Sidebar - Mobile Responsive */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 z-50 ${showSidebar ? 'w-72' : '-translate-x-full md:translate-x-0 md:w-20'
          }`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          {showSidebar && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-all"
          >
            {showSidebar ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => { setActiveTab("business"); setShowSidebar(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "business" ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
          >
            <Briefcase size={20} />
            {showSidebar && <span>My Businesses</span>}
          </button>
          <button
            onClick={() => { setActiveTab("analytics"); setShowSidebar(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "analytics" ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
          >
            <BarChart size={20} />
            {showSidebar && <span>Analytics</span>}
          </button>
          <button
            onClick={() => { setShowProfile(true); setShowSidebar(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${showProfile ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
          >
            <User size={20} />
            {showSidebar && <span>Profile</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-20">

        {/* Mobile Header */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSidebar(true)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu size={24} />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {activeTab === "business" && "My Businesses"}
                    {activeTab === "analytics" && "Analytics"}
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    Manage your listings and track performance
                  </p>
                </div>
              </div>
              {activeTab === "business" && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline">Add Business</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">

          {/* Business Management Tab */}
          {activeTab === "business" && (
            <>
              {/* Search and Filters - Mobile Optimized */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search businesses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="All">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {viewMode === "grid" ? <List size={18} /> : <Grid size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Cards - Mobile Responsive Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-xs">Total Businesses</p>
                      <p className="text-2xl font-bold mt-1">{businesses.length}</p>
                    </div>
                    <Briefcase size={28} className="opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-xs">Total Views</p>
                      <p className="text-2xl font-bold mt-1">{totalViews}</p>
                    </div>
                    <Eye size={28} className="opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-xs">Total Clicks</p>
                      <p className="text-2xl font-bold mt-1">{totalClicks}</p>
                    </div>
                    <Phone size={28} className="opacity-50" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-xs">Active</p>
                      <p className="text-2xl font-bold mt-1">{businesses.length}</p>
                    </div>
                    <CheckCircle size={28} className="opacity-50" />
                  </div>
                </div>
              </div>

              {/* Businesses Display - Grid View for Mobile */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBusinesses.map((business) => (
                    <div key={business.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-center">
                        <span className="text-5xl">{business.image}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{business.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">{business.subcategory}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {business.category}
                          </span>
                          <span className="text-xs text-gray-500">{business.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Eye size={14} />
                            {business.views || 0}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(business)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(business.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Table View - Horizontal Scroll on Mobile */
                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                  <table className="min-w-[600px] w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Business</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredBusinesses.map((business) => (
                        <tr key={business.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{business.image}</span>
                              <div>
                                <div className="font-medium text-gray-900 text-sm">{business.name}</div>
                                <div className="text-xs text-gray-500">{business.subcategory}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {business.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{business.location}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(business)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                <Edit size={16} />
                              </button>
                              <button onClick={() => handleDelete(business.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {filteredBusinesses.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses found</h3>
                  <p className="text-gray-500 text-sm">Add your first business to get started</p>
                </div>
              )}
            </>
          )}

          {/* Analytics Tab - Mobile Optimized */}
          {activeTab === "analytics" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp size={18} className="text-blue-600" />
                    Top Performing
                  </h3>
                  {popularBusiness ? (
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{popularBusiness.image}</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{popularBusiness.name}</p>
                          <p className="text-xs text-gray-500">{popularBusiness.category}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-xl font-bold text-blue-600">{popularBusiness.views || 0}</p>
                          <p className="text-xs text-gray-600">Views</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-xl font-bold text-green-600">{popularBusiness.clicks || 0}</p>
                          <p className="text-xs text-gray-600">Clicks</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No data available</p>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <Users size={18} className="text-purple-600" />
                    Quick Stats
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm">Total Businesses</span>
                      <span className="font-semibold">{businesses.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm">Categories</span>
                      <span className="font-semibold">{new Set(businesses.map(b => b.category)).size}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="font-semibold">
                        {totalViews > 0 ? Math.round((totalClicks / totalViews) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="text-base font-semibold mb-3">Category Distribution</h3>
                <div className="space-y-2">
                  {categories.map(cat => {
                    const count = businesses.filter(b => b.category === cat).length;
                    if (count === 0) return null;
                    const percentage = (count / businesses.length) * 100;
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{cat}</span>
                          <span>{count} ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
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

      {/* Add/Edit Business Modal - Mobile Optimized */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-5 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingBusiness ? "Edit Business" : "Add Business"}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Location/Area *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all active:scale-95">
                  {editingBusiness ? "Update" : "Add"}
                </button>
                <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal - Mobile Optimized */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Profile</h2>
                <button onClick={() => setShowProfile(false)} className="p-2 hover:bg-white/20 rounded-lg">
                  <X size={22} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="text-center mb-5">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                  👤
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500">Full Name</label>
                  <p className="font-semibold text-gray-900 text-sm">{userProfile.name}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Email Address</label>
                  <p className="font-semibold text-gray-900 text-sm">{userProfile.email}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Phone Number</label>
                  <p className="font-semibold text-gray-900 text-sm">{userProfile.phone}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Member Since</label>
                  <p className="font-semibold text-gray-900 text-sm">{userProfile.joinedDate}</p>
                </div>
              </div>
              <button className="w-full mt-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}