"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import "../styles/hero.css"

export default function Hero() {
const [floating, setFloating] = useState(false);

  const features = [
    "جودة عالية معتمدة دولياً",
    "تصنيع صديق للبيئة",
    "توصيل سريع لجميع المناطق",
  ];

  return (
    <section className="hero">
      {/* Background Gradient */}
      <div className="hero-bg"></div>
      <div className="hero-pattern"></div>

      {/* Floating Elements */}
      <div className="floating floating-1" />
      <div className="floating floating-2" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="badge">
            <CheckCircle className="icon" />
            <span>مجاز من قبل وزارة التجارة دائرة مسجل الشركات</span>
          </div>

          <h1 className="hero-title">
            الشريك الأمثل لصناعة
            <span className="highlight">الأكياس البلاستيكية</span>
          </h1>

          <p className="hero-text">
            نقدم حلولاً متكاملة لتصنيع الأكياس البلاستيكية بأعلى معايير الجودة، 
            مع التزامنا بالحفاظ على البيئة واستخدام مواد قابلة لإعادة التدوير.
          </p>

          <div className="hero-buttons">
            <Link href="/products" className="btn-primary">
              استعرض منتجاتنا
              <ArrowLeft className="icon-btn" />
            </Link>
            <Link href="/contact" className="btn-outline">
              تواصل معنا
            </Link>
          </div>

          <div className="hero-features">
            {features.map((f, idx) => (
              <div key={idx} className="feature">
                <CheckCircle className="icon-feature" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-image-container">
          <div className="image-bg-circle" />
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop"
              alt="مصنع الأكياس البلاستيكية"
              className="hero-image"
            />
            <div className="image-gradient-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
};

