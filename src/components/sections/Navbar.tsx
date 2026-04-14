"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Partners", href: "/partners" },
  { label: "Compliance", href: "/compliance" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex-shrink-0">
            <Logo variant={scrolled ? "dark" : "light"} size="md" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-sendara-navy hover:text-sendara-teal"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://app.sendara.one/login"
              className={`font-body text-sm font-medium transition-colors ${
                scrolled
                  ? "text-sendara-navy hover:text-sendara-teal"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Log In
            </a>
            <a href="#lead-capture">
              <Button size="sm">Get a Call Back</Button>
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X
                className={scrolled ? "text-sendara-navy" : "text-white"}
                size={24}
              />
            ) : (
              <Menu
                className={scrolled ? "text-sendara-navy" : "text-white"}
                size={24}
              />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white rounded-b-xl shadow-lg pb-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sendara-navy font-body text-base hover:bg-sendara-off-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://app.sendara.one/login"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sendara-navy font-body text-base hover:bg-sendara-off-white"
            >
              Log In
            </a>
            <div className="px-4 pt-2">
              <a href="#lead-capture" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">
                  Get a Call Back
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
