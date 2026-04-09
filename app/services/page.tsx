// app/services/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Globe, 
  List, 
  Brain,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  BarChart,
  Clock,
  DollarSign,
  Sparkles,
  Phone,
  Mail,
  Star,
  Award,
  Shield,
  Zap,
  MessageCircle,
  X
} from "lucide-react";

// Custom icon components since Lucide doesn't have Google, Facebook, Instagram, Video
const GoogleIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" fill="#1877F2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="#E4405F"/>
  </svg>
);

const VideoIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 9.3V6c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h13c.6 0 1-.4 1-1v-3.3l4 2.7v-11l-4 2.7z" fill="#FF0000"/>
  </svg>
);

export default function ServicesPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const phoneNumber = "+918826687134";
  const emailAddress = "youthyogacademybh@gmail.com";

  const handleWhatsAppClick = () => {
    const message = `Hello! I'm interested in your marketing services. Can I get more information about:
    
1. Google Ads Marketing
2. Meta Ads (Facebook & Instagram)
3. Local SEO Optimization
4. Website Development

Please share detailed pricing and packages. Thanks! 🚀`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailClick = () => {
    const subject = "Inquiry about Marketing Services";
    const body = `Hello Team,

I'm interested in your digital marketing services. Please provide me with more information about:

- Services offered
- Pricing and packages
- Portfolio/Case studies

My details:
Name: ${formData.name || "Not provided"}
Phone: ${formData.phone || "Not provided"}

Looking forward to your response.

Best regards,
${formData.name || "Customer"}`;
    
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `New Service Inquiry!

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service Interested: ${formData.service}
Message: ${formData.message}

Please contact this lead.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setShowPopup(false);
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
  };

  const services = [
    {
      id: 1,
      title: "Google Ads Marketing",
      icon: GoogleIcon,
      iconBg: "from-red-500 to-orange-500",
      description: "Hum aapke business ko Google par top position par laate hain using paid ads. Jab bhi koi user search karta hai 'Gym near me' ya 'Salon in Noida', tab aapka business sabse upar show hota hai.",
      benefits: ["Instant traffic", "High-quality leads", "Targeted audience", "ROI-based campaigns"],
      price: "Starting @ ₹9,999/month",
      popular: true
    },
    {
      id: 2,
      title: "Meta Ads (Facebook & Instagram)",
      icon: FacebookIcon,
      iconBg: "from-blue-600 to-blue-700",
      description: "Hum Facebook aur Instagram par ads chala kar aapke business ko lakho logon tak pahunchate hain. Perfect for local businesses like salons, gyms, restaurants.",
      benefits: ["Visual promotions", "Audience targeting", "Brand awareness boost", "High engagement"],
      price: "Starting @ ₹7,999/month",
      popular: true
    },
    {
      id: 3,
      title: "Local SEO Optimization",
      icon: () => <MapPin className="w-8 h-8 text-white" />,
      iconBg: "from-green-500 to-teal-500",
      description: "Hum aapke business ko Google search aur maps me organically rank karte hain. Aapka business 'near me' searches me top par aayega.",
      benefits: ["Free organic traffic", "Long-term growth", "High visibility", "Local dominance"],
      price: "Starting @ ₹5,999/month",
      popular: false
    },
    {
      id: 4,
      title: "Website Development",
      icon: () => <Globe className="w-8 h-8 text-white" />,
      iconBg: "from-purple-500 to-pink-500",
      description: "Hum aapke business ke liye modern, fast aur mobile-friendly website banate hain jo aapke brand ko represent kare.",
      benefits: ["Professional design", "Fast loading", "SEO optimized", "Mobile responsive"],
      price: "Starting @ ₹15,999",
      popular: true
    },
    {
      id: 5,
      title: "Social Media Management",
      icon: InstagramIcon,
      iconBg: "from-pink-500 to-rose-500",
      description: "Hum aapke social media accounts (Instagram, Facebook) manage karte hain aur regular posts create karte hain jo engagement badhaye.",
      benefits: ["Consistent branding", "Customer engagement", "Viral growth potential", "Community building"],
      price: "Starting @ ₹4,999/month",
      popular: false
    },
    {
      id: 6,
      title: "Video & Creative Marketing",
      icon: VideoIcon,
      iconBg: "from-yellow-500 to-orange-500",
      description: "High-quality promotional videos, reels aur ads create karte hain jo audience ko attract kare aur conversion badhaye.",
      benefits: ["Higher engagement", "Better conversion", "Strong brand image", "Viral content"],
      price: "Custom pricing",
      popular: false
    },
    {
      id: 7,
      title: "Business Listing & Promotion",
      icon: () => <List className="w-8 h-8 text-white" />,
      iconBg: "from-indigo-500 to-blue-500",
      description: "Hum aapke business ko multiple platforms par list karte hain aur optimize karte hain taki maximum visibility mile.",
      benefits: ["Google Business", "Justdial listing", "Local directories", "Review management"],
      price: "Starting @ ₹2,999",
      popular: false
    },
    {
      id: 8,
      title: "AI-Based Marketing",
      icon: () => <Brain className="w-8 h-8 text-white" />,
      iconBg: "from-cyan-500 to-blue-500",
      description: "AI ka use karke hum smart recommendations aur targeted campaigns run karte hain jo better results dete hain.",
      benefits: ["Smart targeting", "Better decision making", "Automated growth", "Predictive analytics"],
      price: "Premium package",
      popular: true,
      future: true
    }
  ];

  const stats = [
    { number: "150+", label: "Happy Clients", icon: Users },
    { number: "98%", label: "Success Rate", icon: Target },
    { number: "500+", label: "Campaigns Run", icon: BarChart },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  const whyChooseUs = [
    { icon: DollarSign, title: "Affordable Pricing", desc: "Best rates for small businesses" },
    { icon: Zap, title: "Fast Results", desc: "Quick ROI and growth" },
    { icon: MapPin, title: "Local Market Understanding", desc: "We know Indian market" },
    { icon: Shield, title: "End-to-End Support", desc: "Complete assistance" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">🚀 Grow Your Business Faster</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Smart Digital Marketing
              <span className="block mt-2">Solutions</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              "Grow Your Business Faster with Smart Digital Marketing Solutions"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleWhatsAppClick}
                className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp for Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setShowPopup(true)}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold text-lg hover:bg-white/30 transition-all duration-300"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="white" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Digital Marketing Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions to take your business to the next level
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <Star size={12} />
                    Most Popular
                  </div>
                </div>
              )}
              
              {service.future && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <Sparkles size={12} />
                    Future Ready
                  </div>
                </div>
              )}

              {/* Service Icon */}
              <div className={`p-6 bg-gradient-to-r ${service.iconBg}`}>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <service.icon />
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                
                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🔥 Benefits:</h4>
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="mb-4 pt-3 border-t border-gray-100">
                  <div className="text-sm text-gray-500">Pricing</div>
                  <div className="text-xl font-bold text-blue-600">{service.price}</div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={handleWhatsAppClick}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Get This Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-300">We deliver results, not just promises</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start promoting your business today!
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Reach more customers with our expert marketing solutions 🚀
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleWhatsAppClick}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Now
            </button>
            <button 
              onClick={handleEmailClick}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold text-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </button>
          </div>
          <p className="text-white/70 mt-6 text-sm">
            Or call us directly: {phoneNumber}
          </p>
        </div>
      </div>

      {/* Contact Info Footer */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">WhatsApp</div>
                <a href={`https://wa.me/${phoneNumber}`} className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                  {phoneNumber}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <a href={`mailto:${emailAddress}`} className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors">
                  {emailAddress}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleWhatsAppClick}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                WhatsApp Now
              </button>
              <button 
                onClick={() => setShowPopup(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Get Started</h3>
              <button onClick={() => setShowPopup(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email (Optional)"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Service</option>
                {services.map(service => (
                  <option key={service.id} value={service.title}>{service.title}</option>
                ))}
              </select>
              <textarea
                placeholder="Your Message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Submit & WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}