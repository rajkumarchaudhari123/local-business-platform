// app/page.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Store, Users, TrendingUp, MapPin, Phone, Star, ArrowRight, CheckCircle, Sparkles, Shield, Clock, Award } from "lucide-react";

// Type definitions
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  features: string[];
  color: string;
}

interface ReasonCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-hidden">
      
      {/* Hero Section with 3D Effect */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-20 -left-48"></div>
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-20 -right-48"></div>
          <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* 3D Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-12 opacity-30 blur-sm"></div>
          </div>
          <div className="absolute bottom-20 right-10 animate-float-delayed">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-20 blur-md"></div>
          </div>
          <div className="absolute top-1/2 left-1/4 animate-float-slow">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg transform -rotate-12 opacity-25 blur-sm"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/90">India's Local Business Platform</span>
            </div>

            {/* Main Heading with Gradient */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-slide-up">
              Promote Your Local
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Business 🚀
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up-delayed">
              Connect with thousands of customers in your neighborhood. 
              Grow your business digitally with India's fastest growing local business platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delayed-2">
              <Link href="/search">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                  List Your Business
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10,000+</div>
                <div className="text-gray-400 mt-1">Business Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50,000+</div>
                <div className="text-gray-400 mt-1">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-gray-400 mt-1">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="white" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Challenge for Local Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In today's digital age, many small businesses struggle to establish their online presence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-4xl">😔</span>
              </div>
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Limited Online Presence</h3>
              <p className="text-gray-600">
                Small businesses remain offline, missing out on digital growth opportunities
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-4xl">💸</span>
              </div>
              <div className="text-5xl mb-4">📢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expensive Advertising</h3>
              <p className="text-gray-600">
                Traditional advertising platforms are costly and often ineffective
              </p>
            </div>

            <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-4xl">🔍</span>
              </div>
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hard to Find Services</h3>
              <p className="text-gray-600">
                Customers struggle to find reliable local services like plumbers, gyms, and salons
              </p>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Real Problems Customers Face</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {["🏋️ Finding a gym nearby", "🔧 Local plumber contact", "💇 Nearby salon info", "🍽️ Best restaurants near me"].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                  <span className="text-2xl">{item.split(' ')[0]}</span>
                  <span className="text-gray-700">{item.substring(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Your Platform */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-4">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-semibold">The Solution</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Complete Digital Bridge
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting Business Owners with Local Customers Seamlessly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">👨‍💼</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">For Business Owners</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">✓ Simple Signup Process</li>
                      <li className="flex items-center gap-2">✓ Add Your Business Details</li>
                      <li className="flex items-center gap-2">✓ Upload Photos & Services</li>
                      <li className="flex items-center gap-2">✓ Share Contact Information</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">👨‍💻</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">For Customers</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">✓ Smart Search "Gym near me"</li>
                      <li className="flex items-center gap-2">✓ Browse Nearby Businesses</li>
                      <li className="flex items-center gap-2">✓ View Photos & Services</li>
                      <li className="flex items-center gap-2">✓ Direct Contact with Businesses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center">
                    <Store className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mt-4">How It Works</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Business Lists", desc: "Sign up and add your business details" },
                    { step: "2", title: "Customer Searches", desc: "Find local businesses by category" },
                    { step: "3", title: "Direct Connect", desc: "Contact businesses directly" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to grow your local business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Search}
              title="Smart Search System"
              features={[
                "Category based (Gym, Salon, Restaurant)",
                "Location based search",
                "Advanced filters"
              ]}
              color="blue"
            />
            <FeatureCard 
              icon={Store}
              title="Business Listing"
              features={[
                "Business Name & Logo",
                "Complete Address",
                "Phone Number & Contact",
                "Services & Photos"
              ]}
              color="purple"
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Growth Tools"
              features={[
                "Analytics Dashboard",
                "Customer Reviews",
                "Promotion Features",
                "Visibility Boost"
              ]}
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose LocalBiz?</h2>
            <p className="text-xl text-gray-300">India's most trusted local business platform</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ReasonCard icon={Shield} title="Verified Businesses" desc="All businesses are verified for authenticity" />
            <ReasonCard icon={Clock} title="24/7 Access" desc="Search and connect anytime, anywhere" />
            <ReasonCard icon={MapPin} title="Location Based" desc="Find businesses in your neighborhood" />
            <ReasonCard icon={Award} title="Trusted Platform" desc="10,000+ businesses trust us" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of local businesses already growing with LocalBiz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Get Started Now
              </button>
            </Link>
            <Link href="/search">
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold text-lg hover:bg-white/30 transition-all duration-300">
                Explore Businesses
              </button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-slide-up-delayed { animation: slide-up 0.6s ease-out 0.2s both; }
        .animate-slide-up-delayed-2 { animation: slide-up 0.6s ease-out 0.4s both; }
      `}</style>
    </div>
  );
}

// Feature Card Component with TypeScript
function FeatureCard({ icon: Icon, title, features, color }: FeatureCardProps) {
  const colors: Record<string, string> = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    pink: "from-pink-500 to-rose-500"
  };
  
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${colors[color]}`}></div>
      <div className="p-8">
        <div className={`w-16 h-16 bg-gradient-to-r ${colors[color]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        <ul className="space-y-2">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Reason Card Component with TypeScript
function ReasonCard({ icon: Icon, title, desc }: ReasonCardProps) {
  return (
    <div className="text-center group">
      <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}