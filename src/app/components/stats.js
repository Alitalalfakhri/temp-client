"use client";

import { useEffect, useState, useRef } from "react";
import { Factory, Globe2, HardHat, Users } from "lucide-react";
import "../styles/stats.css";

const StatItem = ({ icon, value, suffix, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Count animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">
        {count}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <p className="stat-label">{label}</p>
    </div>
  );
};

const Stats = () => {
  const stats = [
    {
      icon: <Factory className="icon-inner" />,
      value: 22,
      suffix: "+",
      label: "سنة من الخبرة",
    },
    {
      icon: <Globe2 className="icon-inner" />,
      value: 18,
      suffix: "+",
      label: "محافظة نتعامل معها"
    },
    {
      icon: <HardHat className="icon-inner" />,
      value: 40,
      suffix: "+",
      label: "موظف"
    },
    {
      icon: <Users className="icon-inner" />,
      value: 1000,
      suffix: "+",
      label: "عميل راضٍ",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat, idx) => (
          <StatItem key={idx} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default Stats;
