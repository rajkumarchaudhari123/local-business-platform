// app/search/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Phone, 
  Star, 
  Filter, 
  X, 
  Navigation, 
  TrendingUp, 
  Clock, 
  Award,
  DollarSign,
  Users,
  Sparkles,
  Mic,
  Map,
  List,
  Grid,
  Heart,
  Share2,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Info,
  ThumbsUp,
  MessageCircle
} from "lucide-react";

// Type definitions
interface Business {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  location: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  phone: string;
  whatsapp: string;
  address: string;
  distance: number;
  openNow: boolean;
  hours: string;
  amenities: string[];
  description: string;
  popular: boolean;
  trending: boolean;
  tags: string[];
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [distance, setDistance] = useState(10);
  const [openNow, setOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState("nearest");
  const [viewMode, setViewMode] = useState("grid");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showMap, setShowMap] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sample businesses data
  const businesses: Business[] = [
    {
      id: 1,
      name: "Power Gym & Fitness",
      category: "Gym",
      subcategory: "Fitness Center",
      location: "Sector 18, Noida",
      lat: 28.5712,
      lng: 77.3212,
      rating: 4.8,
      reviews: 234,
      price: "medium",
      image: "💪",
      phone: "+919876543210",
      whatsapp: "+919876543210",
      address: "3rd Floor, Wave Mall, Sector 18, Noida, Uttar Pradesh 201301",
      distance: 1.2,
      openNow: true,
      hours: "6:00 AM - 10:00 PM",
      amenities: ["Parking", "WiFi", "Locker Room", "Trainer", "AC", "Water Bottle"],
      description: "Premium gym with modern equipment and certified trainers. We offer cardio, strength training, Zumba, Yoga, and personal training sessions.",
      popular: true,
      trending: true,
      tags: ["gym", "fitness", "workout", "health", "cardio", "strength"]
    },
    {
      id: 2,
      name: "Glamour Salon & Spa",
      category: "Salon",
      subcategory: "Beauty Parlour",
      location: "Sector 62, Noida",
      lat: 28.6212,
      lng: 77.3812,
      rating: 4.6,
      reviews: 189,
      price: "high",
      image: "💇",
      phone: "+919876543211",
      whatsapp: "+919876543211",
      address: "Shop No. 12, Near Fortis Hospital, Sector 62, Noida, Uttar Pradesh 201301",
      distance: 2.5,
      openNow: true,
      hours: "10:00 AM - 8:00 PM",
      amenities: ["AC", "Parking", "Free WiFi", "Refreshments", "Premium Products"],
      description: "Luxury salon offering haircut, styling, makeup, facial, pedicure, manicure, and spa services. Professional staff with 10+ years experience.",
      popular: true,
      trending: false,
      tags: ["salon", "spa", "beauty", "haircut", "makeup", "facial"]
    },
    {
      id: 3,
      name: "Foodie's Paradise",
      category: "Restaurant",
      subcategory: "Multi-Cuisine",
      location: "Sector 104, Noida",
      lat: 28.5412,
      lng: 77.3612,
      rating: 4.9,
      reviews: 567,
      price: "medium",
      image: "🍔",
      phone: "+919876543212",
      whatsapp: "+919876543212",
      address: "Ground Floor, Lotus Boulevard, Sector 104, Noida, Uttar Pradesh 201304",
      distance: 0.8,
      openNow: true,
      hours: "11:00 AM - 11:00 PM",
      amenities: ["Dine-in", "Takeaway", "Delivery", "Parking", "Free WiFi"],
      description: "Best restaurant for North Indian, Chinese, Italian, and Continental cuisine. Pure veg and non-veg options available. Family restaurant with cozy ambience.",
      popular: true,
      trending: true,
      tags: ["restaurant", "food", "dining", "delivery", "north indian", "chinese"]
    },
    {
      id: 4,
      name: "Daily Needs Grocery",
      category: "Grocery",
      subcategory: "Supermarket",
      location: "Sector 15, Noida",
      lat: 28.5912,
      lng: 77.3112,
      rating: 4.5,
      reviews: 345,
      price: "low",
      image: "🛒",
      phone: "+919876543213",
      whatsapp: "+919876543213",
      address: "Main Market, Sector 15, Noida, Uttar Pradesh 201301",
      distance: 1.8,
      openNow: true,
      hours: "8:00 AM - 10:00 PM",
      amenities: ["Home Delivery", "Online Order", "Parking", "Fresh Vegetables"],
      description: "Fresh vegetables, fruits, dairy products, household items, and packaged foods. Best quality products at reasonable prices. Free home delivery above ₹500.",
      popular: false,
      trending: true,
      tags: ["grocery", "supermarket", "vegetables", "fruits", "daily needs"]
    },
    {
      id: 5,
      name: "Zen Yoga Studio",
      category: "Gym",
      subcategory: "Yoga Center",
      location: "Sector 50, Noida",
      lat: 28.5612,
      lng: 77.3412,
      rating: 4.7,
      reviews: 123,
      price: "medium",
      image: "🧘",
      phone: "+919876543214",
      whatsapp: "+919876543214",
      address: "2nd Floor, SRS Tower, Sector 50, Noida, Uttar Pradesh 201301",
      distance: 3.2,
      openNow: false,
      hours: "6:00 AM - 9:00 PM",
      amenities: ["Mats Provided", "Locker Room", "Shower", "Changing Room"],
      description: "Professional yoga classes for all age groups. Hatha Yoga, Vinyasa, Power Yoga, Meditation, and Pranayama. Certified instructors with 5+ years experience.",
      popular: false,
      trending: false,
      tags: ["yoga", "meditation", "fitness", "wellness", "pranayama"]
    },
    {
      id: 6,
      name: "Tech Repair Hub",
      category: "Services",
      subcategory: "Electronics Repair",
      location: "Sector 18, Noida",
      lat: 28.5712,
      lng: 77.3212,
      rating: 4.4,
      reviews: 89,
      price: "low",
      image: "🔧",
      phone: "+919876543215",
      whatsapp: "+919876543215",
      address: "Shop No. 45, Atta Market, Sector 18, Noida, Uttar Pradesh 201301",
      distance: 1.5,
      openNow: true,
      hours: "10:00 AM - 7:00 PM",
      amenities: ["Door Service", "Warranty", "Fast Service", "Genuine Parts"],
      description: "Mobile, laptop, tablet, and gadget repair services. iPhone, Samsung, OnePlus, Xiaomi repairs. Data recovery and software installation available.",
      popular: false,
      trending: false,
      tags: ["repair", "mobile", "laptop", "electronics", "phone repair"]
    }
  ];

  const categories = ["All", "Gym", "Salon", "Restaurant", "Grocery", "Services"];

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Location permission denied");
        }
      );
    }

    filterAndSearch();
  }, []);

  useEffect(() => {
    filterAndSearch();
  }, [query, selectedCategory, priceRange, minRating, distance, openNow, sortBy, userLocation]);

  const filterAndSearch = () => {
    let filtered = [...businesses];

    if (query) {
      filtered = filtered.filter(business => 
        business.name.toLowerCase().includes(query.toLowerCase()) ||
        business.category.toLowerCase().includes(query.toLowerCase()) ||
        business.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        business.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    if (priceRange !== "all") {
      filtered = filtered.filter(business => business.price === priceRange);
    }

    if (minRating > 0) {
      filtered = filtered.filter(business => business.rating >= minRating);
    }

    if (userLocation && distance < 50) {
      filtered = filtered.filter(business => business.distance <= distance);
    }

    if (openNow) {
      filtered = filtered.filter(business => business.openNow);
    }

    switch(sortBy) {
      case "nearest":
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case "newly":
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredBusinesses(filtered);
  };

  const saveToHistory = (searchTerm: string) => {
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      const newHistory = [searchTerm, ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      saveToHistory(value);
    }
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
      };
      recognition.start();
    } else {
      alert("Voice search not supported in your browser");
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
      );
    }
    return stars;
  };

  const getPriceIcon = (price: string) => {
    switch(price) {
      case "low": return <DollarSign size={16} className="text-green-500" />;
      case "medium": return <><DollarSign size={16} className="text-yellow-500" /><DollarSign size={16} className="text-yellow-500" /></>;
      case "high": return <><DollarSign size={16} className="text-red-500" /><DollarSign size={16} className="text-red-500" /><DollarSign size={16} className="text-red-500" /></>;
      default: return null;
    }
  };

  // Business Detail Modal Component
  const BusinessDetailModal = ({ business, onClose }: { business: Business; onClose: () => void }) => {
    const getRatingStarsDetail = (rating: number) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          <Star key={i} size={20} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
        );
      }
      return stars;
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              <X size={24} />
            </button>
            <div className="flex items-center gap-4">
              <div className="text-6xl">{business.image}</div>
              <div>
                <h2 className="text-3xl font-bold">{business.name}</h2>
                <p className="text-blue-100">{business.subcategory}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Rating & Quick Info */}
            <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <div className="flex">{getRatingStarsDetail(Math.floor(business.rating))}</div>
                <span className="font-semibold">{business.rating}</span>
                <span className="text-gray-500">({business.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation size={16} className="text-green-600" />
                <span>{business.distance} km away</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${business.openNow ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <Clock size={14} />
                <span className="text-sm font-semibold">{business.openNow ? 'Open Now' : 'Closed'}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Info size={20} />
                About Us
              </h3>
              <p className="text-gray-700 leading-relaxed">{business.description}</p>
            </div>

            {/* Address */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <MapPin size={20} />
                Location
              </h3>
              <p className="text-gray-700">{business.address}</p>
            </div>

            {/* Hours */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Clock size={20} />
                Business Hours
              </h3>
              <p className="text-gray-700">{business.hours}</p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <ThumbsUp size={20} />
                Amenities & Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {business.amenities.map((amenity, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {business.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t">
              <a 
                href={`tel:${business.phone}`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <Phone size={20} />
                Call Now
              </a>
              <a 
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Find Local Businesses Near You
            </h1>
            <p className="text-lg text-blue-100">Discover the best services in your neighborhood</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl">
                <Search className="absolute left-4 text-gray-400" size={20} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Search for gym, salon, restaurant, grocery..."
                  className="w-full pl-12 pr-24 py-5 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none text-lg"
                />
                <div className="absolute right-2 flex gap-2">
                  <button 
                    onClick={startVoiceSearch}
                    className={`p-2 rounded-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    <Mic size={20} />
                  </button>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 hover:bg-gray-100 rounded-xl text-gray-600"
                  >
                    <Filter size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && query.length > 0 && filteredBusinesses.length > 0 && (
              <div className="absolute z-20 mt-2 w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Suggestions</h3>
                  {filteredBusinesses.slice(0, 5).map((business) => (
                    <div 
                      key={business.id}
                      onClick={() => {
                        setQuery(business.name);
                        setShowSuggestions(false);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <span className="text-2xl">{business.image}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{business.name}</div>
                        <div className="text-sm text-gray-500">{business.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {searchHistory.length > 0 && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Recent Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {searchHistory.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(item)}
                          className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Advanced Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl transition-all ${selectedCategory === cat ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Budget ($)</option>
                  <option value="medium">Moderate ($$)</option>
                  <option value="high">Premium ($$$)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Rating</label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex-1 px-3 py-2 rounded-xl transition-all ${minRating === rating ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {rating === 0 ? "Any" : `${rating}+ ⭐`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Distance (km)</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600 mt-1">Within {distance} km</div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer mt-6">
                  <input
                    type="checkbox"
                    checked={openNow}
                    onChange={(e) => setOpenNow(e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-semibold text-gray-700">Open Now</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="nearest">Nearest First</option>
                  <option value="rating">Top Rated</option>
                  <option value="popular">Most Popular</option>
                  <option value="newly">Newly Added</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredBusinesses.length} Businesses Found
            </h2>
            <p className="text-gray-600 mt-1">Showing results near you</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Results Display */}
        {filteredBusinesses.length > 0 ? (
          <div className={`grid ${viewMode === "grid" ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {filteredBusinesses.map((business, index) => (
              <div 
                key={business.id}
                onClick={() => setSelectedBusiness(business)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Trending/Popular Badge */}
                {(business.trending || business.popular) && (
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {business.trending && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        <TrendingUp size={12} />
                        Trending
                      </div>
                    )}
                    {business.popular && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        <Award size={12} />
                        Popular
                      </div>
                    )}
                  </div>
                )}

                {/* Business Image/Icon */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-7xl transform group-hover:scale-110 transition-transform duration-300">
                    {business.image}
                  </span>
                </div>

                {/* Business Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{business.name}</h3>
                      <p className="text-sm text-gray-500">{business.subcategory}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                      <Navigation size={14} className="text-green-600" />
                      <span className="text-sm font-semibold text-green-600">{business.distance} km</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{getRatingStars(Math.floor(business.rating))}</div>
                    <span className="text-sm font-semibold text-gray-900">{business.rating}</span>
                    <span className="text-sm text-gray-500">({business.reviews} reviews)</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600 line-clamp-2">{business.address}</p>
                  </div>

                  {/* Price & Open Status */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1">
                      {getPriceIcon(business.price)}
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${business.openNow ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      <Clock size={12} />
                      {business.openNow ? 'Open Now' : 'Closed'}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Businesses Found</h3>
            <p className="text-gray-600 mb-6">We couldn't find any businesses matching your criteria</p>
            <button 
              onClick={() => {
                setQuery("");
                setSelectedCategory("All");
                setPriceRange("all");
                setMinRating(0);
                setDistance(10);
                setOpenNow(false);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Business Detail Modal */}
      {selectedBusiness && (
        <BusinessDetailModal business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}