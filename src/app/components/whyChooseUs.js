"use client";

import { Award, Clock, Leaf, Truck, Settings, Headphones } from "lucide-react";
import "../styles/whyChooseUs.css";

const features = [
  {
    icon: Award,
    title: "جودة معتمدة",
    description: "مجاز من قبل وزارة التجارة دائرة مسجل الشركات",
  },
  {
    icon: Clock,
    title: "سرعة الإنتاج",
    description: "قدرة إنتاجية عالية تضمن تلبية طلباتكم في الوقت المحدد",
  },
  {
    icon: Leaf,
    title: "صديق للبيئة",
    description: "نستخدم مواد قابلة لإعادة التدوير ونلتزم بالمعايير البيئية",
  },
  {
    icon: Truck,
    title: "توصيل سريع",
    description: "خدمة توصيل سريعة لجميع مناطق المملكة والدول المجاورة",
  },
  {
    icon: Settings,
    title: "حلول مخصصة",
    description: "نصمم ونصنع أكياس بمواصفات خاصة حسب احتياجاتكم",
  },
  {
    icon: Headphones,
    title: "دعم متواصل",
    description: "فريق دعم متخصص جاهز لمساعدتكم على مدار الساعة",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <div className="why-container">
        {/* Header */}
        <div className="why-header">
          <span className="why-label">لماذا تختارنا</span>
          <h2 className="why-title">
            ما يميزنا عن <span className="text-primary">المنافسين</span>
          </h2>
          <p className="why-subtitle">
            نحن نفخر بتقديم خدمات متميزة ومنتجات عالية الجودة تلبي تطلعات عملائنا
          </p>
        </div>

        {/* Features Grid */}
        <div className="why-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <Icon className="icon-inner" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
