"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import "../styles/CtaSection.css";

export default function CTASection() {
return (
    <section className="cta-section">
      {/* Background gradient + pattern */}
      <div className="cta-bg-gradient" />
      <div 
        className="cta-bg-pattern"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">
            هل تبحث عن شريك موثوق لصناعة أكياسك؟
          </h2>
          <p className="cta-subtitle">
            تواصل معنا اليوم واحصل على عرض سعر مخصص لاحتياجاتك. فريقنا جاهز لمساعدتك!
          </p>

          <div className="cta-buttons">
            <Link href="/contact" className="cta-btn cta-btn-primary">
              <MessageCircle className="cta-icon" />
              طلب عرض سعر
            </Link>
            <a href="tel:+966500000000" className="cta-btn cta-btn-outline">
              <Phone className="cta-icon" />
              اتصل بنا الآن
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

