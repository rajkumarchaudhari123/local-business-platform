// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// Type definitions
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

interface MobileNavLinkProps {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo/Brand */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transform group-hover:rotate-12 transition-transform duration-300"></div>
                        <h1 className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            LocalBiz
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/services"> Services</NavLink>
                        <NavLink href="/search">Search</NavLink>
                        <NavLink href="/dashboard">Add Business</NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
                        <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                        <MobileNavLink href="/search" onClick={() => setIsOpen(false)}>Search</MobileNavLink>
                        <MobileNavLink href="/dashboard" onClick={() => setIsOpen(false)}>Add Business</MobileNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Desktop Navigation Link Component
function NavLink({ href, children }: NavLinkProps) {
    return (
        <Link
            href={href}
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium relative group"
        >
            {children}
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
        </Link>
    );
}

// Mobile Navigation Link Component
function MobileNavLink({ href, onClick, children }: MobileNavLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
        >
            {children}
        </Link>
    );
}