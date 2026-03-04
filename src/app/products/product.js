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

// YouTube / Shorts URL → embed URL (same logic as gallery)
function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  if (url.includes('/embed/')) return url;
  return url;
}






const ProductsPage = () => {




  const router = useRouter();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [dialogView, setDialogView] = useState('image'); // 'image' | 'video' for modal
  const [showVideoInBlock, setShowVideoInBlock] = useState({}); // productId -> true to show video inline
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
    setDialogView('image');
    document.body.style.overflow = 'hidden';
  };

  const closeImageDialog = () => {
    setSelectedImage(null);
    setDialogView('image');
    document.body.style.overflow = 'unset';
  };

  const toggleInlineVideo = (productId) => {
    setShowVideoInBlock(prev => ({ ...prev, [productId]: !prev[productId] }));
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

            {/* Right side - Image / Video */}
            <div className={styles.imageSection}>
              {showVideoInBlock[product.id] && product.videoLink ? (
                <div className={styles.inlineVideoWrapper}>
                  <iframe
                    src={`${getYouTubeEmbedUrl(product.videoLink)}?rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen"
                    allowFullScreen
                    className={styles.inlineVideoIframe}
                    title={product.title}
                  />
                  <button
                    type="button"
                    className={styles.backToImageBtn}
                    onClick={() => setShowVideoInBlock(prev => ({ ...prev, [product.id]: false }))}
                  >
                    عرض الصورة
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.imageClickArea} onClick={() => openImageDialog(product)}>
                    <Image
                      src={product.imageLink}
                      alt={product.title}
                      width={500}
                      height={500}
                      className={styles.productImage}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  {product.videoLink && (
                    <button
                      type="button"
                      className={styles.showVideoBtn}
                      onClick={() => toggleInlineVideo(product.id)}
                    >
                      عرض فيديو
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image/Video Dialog (gallery-style tabs) */}
      {selectedImage && (
        <div className={styles.imageDialog} onClick={closeImageDialog}>
          <div className={styles.dialogOverlay}></div>
          <div className={styles.dialogContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeImageDialog} aria-label="إغلاق">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {selectedImage.videoLink && (
              <div className={styles.dialogTabs}>
                <button
                  type="button"
                  className={`${styles.dialogTab} ${dialogView === 'image' ? styles.dialogTabActive : ''}`}
                  onClick={() => setDialogView('image')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  الصورة
                </button>
                <button
                  type="button"
                  className={`${styles.dialogTab} ${dialogView === 'video' ? styles.dialogTabActive : ''}`}
                  onClick={() => setDialogView('video')}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  الفيديو
                </button>
              </div>
            )}
            {dialogView === 'image' ? (
              <div className={styles.dialogImageWrapper}>
                <Image
                  src={selectedImage.imageLink}
                  alt={selectedImage.title}
                  width={1200}
                  height={1200}
                  className={styles.dialogImage}
                />
              </div>
            ) : selectedImage.videoLink ? (
              <div className={styles.dialogVideoWrapper}>
                <iframe
                  src={`${getYouTubeEmbedUrl(selectedImage.videoLink)}?rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen"
                  allowFullScreen
                  className={styles.dialogVideoIframe}
                  title={selectedImage.title}
                />
              </div>
            ) : null}
            <h3 className={styles.dialogTitle}>{selectedImage.title}</h3>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductsPage;