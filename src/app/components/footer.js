"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import "../styles/footer.css";
import Image from "next/image";
const Footer = () => {
  const quickLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "من نحن", path: "/about" },
    { name: "منتجاتنا", path: "/products" },
    { name: "تواصل معنا", path: "/contact" },
  ];

  const products = [
    "أكياس التسوق",
    "أكياس صناعية",
    "أكياس تغليف الأغذية",
    "أكياس مطبوعة مخصصة",
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/altayf.gold/?locale=ar_AR", label: "Facebook" },
    
    { icon: Instagram, href: "https://www.instagram.com/altayfaldhahabiu?ighs=emNmM3J4OWJ5dnB5", label: "Instagram" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div>
            <Link href="/" className="footer-logo">
              <div className="footer-logo-icon">
                <Image src="/logo.png" width={78} height={58} alt="طيف الذبي" />
              </div>
              <div style={{marginRight: '20px'}}>
                <h3 style={{margin:"0.1rem"}}>شركة الطيف الذهبي</h3>
                <p style={{marginTop:'1px'  }}>للطباعة والتغليف</p>
              </div>
            </Link>
            <p className="footer-text">
              نقدم حلولاً متكاملة لصناعة الأكياس البلاستيكية بأعلى معايير الجودة والالتزام بالمعايير البيئية.
            </p>
            <div className="footer-socials">
              {socialLinks.map((social, idx) => (
                <a key={idx} href={social.href} aria-label={social.label} className="footer-social-icon">
                  <social.icon className="footer-icon" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4>روابط سريعة</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          

          {/* Contact Info */}
          <div>
            <h4>تواصل معنا</h4>
            <ul className="footer-contact">
              <li>
                <MapPin className="footer-contact-icon" />
                 بغداد عويريج الصناعية قرب مخرج بغداد
              </li>
              <li>
                <Phone className="footer-contact-icon" />
                <a href="tel:+9647705999430" className="footer-link">
                  +964 770 599 9430
                </a>
              </li>
              <li>
                <Mail className="footer-contact-icon" />
                <a href="mailto:altayfaldhahabiu@gmail.com" className="footer-link">
                  altayfaldhahabiu@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          © {new Date().getFullYear()}  شركة الطيف الذهبي  جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
