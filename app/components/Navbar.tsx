// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Home, Search, Briefcase, Sparkles, ChevronRight } from "lucide-react";

// Type definitions
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

interface MobileNavLinkProps {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        
        // Set active link based on current path
        setActiveLink(window.location.pathname);
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const navLinks = [
        { href: "/", label: "Home", icon: <Home size={18} /> },
        { href: "/services", label: "Services", icon: <Sparkles size={18} /> },
        { href: "/search", label: "Search", icon: <Search size={18} /> },
        { href: "/dashboard", label: "Add Business", icon: <Briefcase size={18} /> },
    ];

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-500 ${
                scrolled 
                    ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl" 
                    : "bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-md"
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        
                        {/* 3D Logo/Brand with Animation */}
                        <Link 
                            href="/" 
                            className="group relative flex items-center space-x-3 perspective-1000"
                        >
                            {/* 3D Rotating Box */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative w-9 h-9 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-xl">
                                    <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-white/40 rounded-full"></div>
                                </div>
                            </div>
                            
                            {/* 3D Text */}
                            <div className="relative">
                                <h1 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                                    LocalBiz
                                </h1>
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500"></div>
                            </div>
                        </Link>

                        {/* Desktop Menu with 3D Effects */}
                        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                            {navLinks.map((link) => (
                                <NavLink 
                                    key={link.href} 
                                    href={link.href} 
                                    icon={link.icon}
                                    isActive={activeLink === link.href}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* 3D Animated Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden relative w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group perspective-1000"
                            aria-label="Toggle menu"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                {isOpen ? (
                                    <X size={24} className="text-white animate-spin-once" />
                                ) : (
                                    <Menu size={24} className="text-white" />
                                )}
                            </div>
                        </button>
                    </div>

                    {/* 3D Mobile Menu Dropdown */}
                    <div className={`md:hidden fixed left-0 right-0 transition-all duration-500 ease-in-out transform ${
                        isOpen 
                            ? "opacity-100 translate-y-0 visible" 
                            : "opacity-0 -translate-y-10 invisible"
                    }`} style={{ top: "80px" }}>
                        <div className="relative mx-4">
                            {/* Glass morphism background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl backdrop-blur-xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl"></div>
                            
                            {/* Menu Content */}
                            <div className="relative p-4 space-y-2">
                                {navLinks.map((link, index) => (
                                    <MobileNavLink 
                                        key={link.href} 
                                        href={link.href} 
                                        onClick={() => setIsOpen(false)}
                                        icon={link.icon}
                                        delay={index * 100}
                                    >
                                        {link.label}
                                    </MobileNavLink>
                                ))}
                                
                                {/* Decorative Elements */}
                                <div className="pt-4 mt-2 border-t border-white/10">
                                    <div className="flex items-center justify-between px-4 py-3">
                                        <p className="text-xs text-gray-400">
                                            Grow your business with LocalBiz
                                        </p>
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                                            <Sparkles size={14} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated Border Bottom */}
                <div className={`h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ${scrolled ? "opacity-100" : "opacity-50"}`}></div>
            </nav>

            {/* Overlay for mobile menu with blur effect */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 md:hidden z-40 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setIsOpen(false)}
                style={{ top: "80px" }}
            />
        </>
    );
}

// Desktop Navigation Link Component with 3D Hover Effect
function NavLink({ href, children, icon, isActive }: NavLinkProps & { icon?: React.ReactNode; isActive?: boolean }) {
    return (
        <Link
            href={href}
            className={`relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 group perspective-1000 ${
                isActive 
                    ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-600/20" 
                    : "text-gray-300 hover:text-white"
            }`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 -z-10"></div>
            <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-20"></div>
            
            <div className="relative flex items-center gap-2 transform group-hover:translate-x-1 transition-transform duration-300">
                {icon && <span className="text-blue-400 group-hover:text-white transition-colors">{icon}</span>}
                <span>{children}</span>
                {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                )}
            </div>
            
            {/* Animated underline */}
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
        </Link>
    );
}

// Mobile Navigation Link Component with Slide Animation
function MobileNavLink({ href, onClick, children, icon, delay = 0 }: MobileNavLinkProps & { icon?: React.ReactNode; delay?: number }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group relative flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 transform hover:translate-x-2 active:scale-98"
            style={{
                animation: `slideInFromLeft 0.5s ease-out ${delay}ms both`
            }}
        >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Left side - Icon and Label */}
            <div className="relative flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {icon ? (
                        <div className="text-blue-400">{icon}</div>
                    ) : (
                        <ChevronRight size={18} className="text-gray-400" />
                    )}
                </div>
                <span className="text-gray-300 group-hover:text-white font-medium text-lg transition-colors duration-300">
                    {children}
                </span>
            </div>
            
            {/* Right side - Arrow indicator */}
            <div className="relative w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                <ChevronRight size={16} className="text-blue-400" />
            </div>
        </Link>
    );
}

// Add global styles for animations
const styles = `
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes spinOnce {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(180deg);
        }
    }
    
    .animate-spin-once {
        animation: spinOnce 0.3s ease-out;
    }
    
    .perspective-1000 {
        perspective: 1000px;
    }
    
    .active\\:scale-98:active {
        transform: scale(0.98);
    }
`;

// Inject styles
if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}