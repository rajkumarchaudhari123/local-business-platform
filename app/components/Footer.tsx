// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// Type definitions for components
interface SocialIconProps {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

interface ServiceItemProps {
  children: React.ReactNode;
}

interface ContactItemProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo & About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl transform rotate-3"></div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                LocalBiz
              </h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Helping local businesses grow digitally and connect with customers in their community. 🚀
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <SocialIcon href="#" icon={FaFacebook} />
              <SocialIcon href="#" icon={FaTwitter} />
              <SocialIcon href="#" icon={FaInstagram} />
              <SocialIcon href="#" icon={FaLinkedin} />
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/search">Search Businesses</FooterLink>
              <FooterLink href="/dashboard">Add Your Business</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <ServiceItem>Business Listing</ServiceItem>
              <ServiceItem>Local Promotion</ServiceItem>
              <ServiceItem>Search Nearby</ServiceItem>
              <ServiceItem>Customer Reviews</ServiceItem>
              <ServiceItem>Analytics Dashboard</ServiceItem>
            </ul>
          </div>

          {/* Contact & Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
            </h3>
            <div className="space-y-4">
              <ContactItem icon={FiMail} text="support@localbiz.com" />
              <ContactItem icon={FiPhone} text="+91 99999 99999" />
              <ContactItem icon={FiMapPin} text="Mumbai, India" />
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-300">Subscribe to Newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 LocalBiz. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Social Media Icon Component
function SocialIcon({ href, icon: Icon }: SocialIconProps) {
  return (
    <a 
      href={href} 
      className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:scale-110"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={18} className="text-gray-300 hover:text-white transition-colors" />
    </a>
  );
}

// Footer Link Component
function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-300 hover:text-white transition-all duration-200 flex items-center group"
      >
        <span className="w-0 group-hover:w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-0 group-hover:mr-2 transition-all duration-200"></span>
        {children}
      </Link>
    </li>
  );
}

// Service Item Component
function ServiceItem({ children }: ServiceItemProps) {
  return (
    <li className="text-gray-300 flex items-center group cursor-default">
      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2 group-hover:scale-125 transition-transform"></div>
      {children}
    </li>
  );
}

// Contact Item Component
function ContactItem({ icon: Icon, text }: ContactItemProps) {
  return (
    <div className="flex items-center space-x-3 text-gray-300 group">
      <div className="p-2 bg-white/5 rounded-lg group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-purple-600/20 transition-all duration-200">
        <Icon size={16} className="text-blue-400" />
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}