"use client";

import Link from "next/link";
import Image from "next/image";
import { useState , useEffect, use} from "react";
import { ArrowLeft, ShoppingBag, Package, Utensils, Printer } from "lucide-react";
import "../styles/productSection.css";
import splx from "../assets/siplx.jpg";
import mat from "../assets/mat.jpg";
import naelon from '../assets/naelon.jpg';
import fanela from '../assets/fanela.jpg';
import {useRouter} from "next/navigation";
import { API_URL } from "@/app/lib/lib.js";
const ProductsSection = () => {

  const [loading, setLoading] = useState(true);
  const [products , setProducts] = useState([])

  useEffect(() => {
    let isMounted = true; // flag to prevent setting state if component unmounts

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/api/products`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            if (isMounted) {
                setProducts(data);
                setLoading(false);
                console.log(data)
            }
        } catch (err) {
            if (isMounted) setLoading(false);
            alert('Error fetching the products: ' + err.message);
        }
    }

    fetchProducts();

    return () => {
        isMounted = false; // cleanup
    }
}, []);

  const router = useRouter();

  function handelClick(title){
    router.push(`/products#${title}`)

  }
  return (
    <section className="products-section">
      <div className="products-container">
        {/* Header */}
        <div className="products-header">
          <span className="products-label">منتجاتنا</span>
          <h2 className="products-title">
            تشكيلة واسعة من <span className="text-primary">الأكياس البلاستيكية</span>
          </h2>
          <p className="products-subtitle">
            نقدم مجموعة متنوعة من الأكياس البلاستيكية عالية الجودة لتلبية احتياجاتك المختلفة
          </p>
        </div>

        {/* Products Grid */}
        {loading && <p style={{ textAlign: "center" }}>جاري التحميل... ⏳</p>}

         
        <div className="products-grid">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => {
                handelClick(product.title)
              }}>
                <div className="product-image-wrapper">
                  <Image src={product.imageLink} alt={product.title} className="product-image" width={100} height={100}/>
                  <div className="product-gradient" />
                 
                </div>
                <div className="product-content">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="products-cta">
          <Link href="/products" className="btn-primary">
            عرض جميع المنتجات <ArrowLeft className="btn-icon" />
          </Link>
        </div>
        <Image src="/logo.png" width={200} height={150} alt="طيف الذبي" className="products-logo" />
      </div>
    </section>
     
  );
   
};

export default ProductsSection;
