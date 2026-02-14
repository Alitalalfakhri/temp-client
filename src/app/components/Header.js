"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "../styles/header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "من نحن", path: "/about" },
    { name: "منتجاتنا", path: "/products" },
    { name: "تواصل معنا", path: "/contact" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link  className="logo" href="/">
          <Image src="/logo.png" width={48} height={38} alt="طيف الذبي" />
          
          <div className="logo-text">
            <h1 style={{fontWeight:"bold" , fontSize:"1.45rem"}}>شركة الطيف الذهبي</h1>
            <p>للطباعة والتغليف</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link ${isActive(link.path) ? "active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="cta">
          <a href="tel:+9647705999430" className="phone">
            اتصل بنا    
          </a>
          <Link href="/contact" className="btn-primary">
              استفسر عن المنتجات
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`mobile-link ${isActive(link.path) ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/contact"
            className="btn-primary mobile-btn"
            onClick={() => setIsOpen(false)}
          >
            طلب عرض سعر
          </Link>
        </div>
      )}
    </nav>
  );
}
