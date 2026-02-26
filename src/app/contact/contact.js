'use client';

import { useState, useEffect } from "react";
import styles from "@/app/styles/contact/contact.module.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/footer";
import { useRouter, useSearchParams } from "next/navigation";

export default function ContactCode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productQuery = searchParams.get("product");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    message: "",
  });

  // Prefill message if product exists
  useEffect(() => {
    if (productQuery && !formData.message) {
      setFormData((prev) => ({
        ...prev,
        message: `السلام عليكم، أرغب بالسؤال عن: ${productQuery}`,
      }));
    }
  }, [productQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `${formData.message}\nالاسم: ${formData.name}${
      formData.company ? `\nالشركة: ${formData.company}` : ""
    }`;

    router.push(`https://wa.me/9647705999430?text=${encodeURIComponent(text)}`);
    setFormData({ name: "", company: "", message: "" });
  };

  const contactInfo = [
    { icon: "📞", title: "الهاتف", value: "+964 770 599 9430", link: "tel:+9647705999430" },
    { icon: "✉️", title: "البريد الإلكتروني", value: "altayfaldhahabiu@gmail.com", link: "mailto:altayfaldhahabiu@gmail.com" },
    { icon: "📍", title: "العنوان", value: "عويريج الصناعية قرب اقواس بغداد", link: "#" },
    { icon: "⏰", title: "ساعات العمل", value: "السبت - الخميس: 8 ص - 6 م", link: "#" },
  ];

  return (
    <>
      <Header />

      <section className={styles.hero}>
        <span className={styles.heroTag}>تواصل معنا</span>
        <h1 className={styles.heroTitle}>
          نحن هنا <span className={styles.highlight}>لمساعدتك</span>
        </h1>
        <p className={styles.heroText}>
          تواصل معنا للحصول على عرض سعر مخصص أو لأي استفسار
        </p>
      </section>

      <section className={styles.container}>
        <div className={styles.contactGrid}>
          {/* Contact Form */}
          <div className={styles.contactForm}>
            <h2 className={styles.formTitle}>أرسل لنا رسالة</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <input
                  type="text"
                  required
                  placeholder="الاسم الكامل"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                /> <br/>
                <input
                  type="text"
                  placeholder="اسم الشركة (اختياري)"
                  className={styles.input}
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <textarea
                required
                rows="5"
                placeholder="رسالتك"
                className={styles.textarea}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <button type="submit" className={styles.btnSubmit}>
                إرسال الرسالة
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className={styles.contactInfoSection}>
            <h2 className={styles.infoTitle}>معلومات التواصل</h2>
            {contactInfo.map((info, idx) => (
              <a key={idx} href={info.link} className={styles.infoCard}>
                <div className={styles.icon}>{info.icon}</div>
                <div>
                  <h4>{info.title}</h4>
                  <p>{info.value}</p>
                </div>
              </a>
            ))}

            {/* Map */}
            <div className={styles.mapBox}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d180.70849303110583!2d44.36893648632307!3d33.18349292993168!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sar!2siq!4v1770682006946!5m2!1sar!2siq"
                width="450"
                height="400"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
