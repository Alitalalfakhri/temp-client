'use client';

import { useState , useEffect} from 'react';
import Image from 'next/image';
import styles from '@/app/styles/products/products.module.css';
import Header from '@/app/components/Header';
import {API_URL} from '@/app/lib/lib.js'
import Footer from '@/app/components/footer';
import AOS from "aos";
import "aos/dist/aos.css";
import {useRouter} from 'next/navigation'
const ProductList = () => {




  const router = useRouter();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading , setLoading] = useState(true);
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


  const handleSizeClick = (productId, sizeObj , productTitle) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: sizeObj
    }));
    router.push(`https://wa.me/9647705999430?text= السلام عليكم ارغب بالاستفسار عن ${productTitle} القياس ${sizeObj.width}X${sizeObj.height}`);
  };

  const openImageDialog = (product) => {
    setSelectedImage(product);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeImageDialog = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const handleContactClick = (productTitle) => {
    router.push(`/contact?product=${productTitle}`);
  }
   

  return (
    <div className='productsPage' >
       <Header />
      {/* hero of the page */}
      <section className={styles.productHero}>
        <div className={styles.heroBackground}></div>
        <div className={`${styles.container} ${styles.center}`}>
          <div className={styles.badgeContainer}>
            <span className={styles.badge}>منتجاتنا </span>
          </div>
          
          <h1>
            تغليف لكل <span style={{color:'hsl(45 95% 55%)' , fontSize:"40px"}} className={styles.highlight}>انواع المشاريع</span> 
          </h1>
          <p>
           تغليف لكل انواع المشاريع بافضل جودة وبأفضل سعر
          </p>
        </div>
      </section>

      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.id} className={`${styles.productBlock} ${product.title}`}>
            {/* Left side - Content */}
            <div className={styles.contentSection}>
              {/* Title */}
              <h2 className={styles.productTitle}>{product.title}</h2>

              {/* Sizes Grid */}
              <div className={styles.sizesGrid}>
                {product.sizes.map((sizeObj, index) => (
                  <button
                    data-aos="flip-left"
                    key={index}
                    className={`${styles.sizeButton} ${
                      selectedSizes[product.id]?.size === sizeObj.size ? styles.selected : ''
                    }`}
                    onClick={() => handleSizeClick(product.id, sizeObj , product.title)}
                  >
                    <div className={styles.sizeLabel}>القياسات: {sizeObj.width}X{sizeObj.height}</div>
                    <div className={styles.priceLabel}>
                      السعر: {sizeObj.price.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <button onClick={() => {
                handleContactClick(product.title)
              }} className={styles.ctaButton}>
                <span>استفسر عن المنتج</span>
                <span className={styles.arrow}>←</span>
              </button>
            </div>

            {/* Right side - Image */}
            <div className={styles.imageSection}>
              <Image
                src={product.imageLink}
                alt={product.title}
                width={500}
                height={500}
                className={styles.productImage}
                onClick={() => openImageDialog(product)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Image Dialog/Modal */}
      {selectedImage && (
        <div className={styles.imageDialog} onClick={closeImageDialog}>
          <div className={styles.dialogOverlay}></div>
          <div className={styles.dialogContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeImageDialog}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className={styles.dialogImageWrapper}>
              <Image
                src={selectedImage.imageLink}
                alt={selectedImage.title}
                width={1200}
                height={1200}
                className={styles.dialogImage}
              />
            </div>
            <h3 className={styles.dialogTitle}>{selectedImage.title}</h3>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductList;