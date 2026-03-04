'use client'

import { useEffect, useState } from "react";
import styles from "../styles/gallery/gallery.module.css";
import axios from 'axios'
import Header from "@/app/components/Header";
 import Footer from "@/app/components/footer";
import {API_URL} from '../lib/lib'
import { X } from 'lucide-react'


export const metadata = {
    title:"معرض اعمالنا | شركة الطيف الذهبي للطباعة والتغليف",
    description:"تعرف على مختلف انواع الاكياس البلاستيكة وانظر الى اعمالنا السابقةة",
    robots: {
      index: true,
      follow: true,
    },
}



export default function Gallery() {
  const [activeTab, setActiveTab] = useState("images");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const[videos,setVideos] = useState([])
  const [images, setImages] = useState([])

  const isShorts = (url) => url && url.includes("/shorts/");

  const getYouTubeEmbedUrl = (url) => {
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;

    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    if (url.includes("/embed/")) return url;

    return url;
  };

  const getYouTubeThumbnail = (url) => {
    const embedUrl = getYouTubeEmbedUrl(url);
    const idMatch = embedUrl.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    if (idMatch) return `https://img.youtube.com/vi/${idMatch[1]}/hqdefault.jpg`;
    return null;
  };

  useEffect(() => {
    async function fetchImages(){
      try{
      const res = await axios.get(`${API_URL}/api/images`)
      setImages(res.data)
      console.log(res.data)
      }catch(err){
        console.log(err)
        alert(err.response?.data?.message || "حدث خطأ أثناء تحميل الصور")
      }

    }
    fetchImages()
  },[])

  useEffect(() => {
      async function fetchVideos(){
        try{
          const res = await axios.get(`${API_URL}/api/factory/videos`)
          console.log(res.data)
          setVideos(res.data)

          const processedVideos = res.data.map((v) => ({
        ...v,
        // Ensure you use v.videoUrl (the field from your DB)
        embedUrl: getYouTubeEmbedUrl(v.videoUrl), 
        thumbnail: getYouTubeThumbnail(v.videoUrl),
      }));

      // 2. Set the processed data to state
      setVideos(processedVideos);
      }catch(err){
        console.error(err)
      }
  }
  fetchVideos()

}, [])
  

  return (
    <div className={styles.wrapper}>
      {/* Replace with your <Navbar /> component */}
      <Header/>

      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroInner}>
            <span className={styles.badge}>معرض الأعمال</span>
            <h1 className={styles.heroTitle}>
              مكتبة <span>الصور والفيديو</span>
            </h1>
            <p className={styles.heroDesc}>
              استعرض أعمالنا ومنتجاتنا وخطوط الإنتاج في مصنعنا
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryContainer}>

          {/* Tabs */}
          <div className={styles.tabsList}>
            <button
              className={`${styles.tabTrigger} ${activeTab === "images" ? styles.active : ""}`}
              onClick={() => setActiveTab("images")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              الصور
            </button>
            <button
              className={`${styles.tabTrigger} ${activeTab === "videos" ? styles.active : ""}`}
              onClick={() => setActiveTab("videos")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              الفيديوهات
            </button>
          </div>

          {/* Images Tab */}
          <div className={`${styles.tabContent} ${activeTab === "images" ? styles.active : ""}`}>
            <div className={styles.imageGrid}>
            {images.length === 0 ? (
  <p>جاري تحميل الصور...</p>
) : (
  images.map((img, i) => (
    <div
      key={i}
      className={styles.imageCard}
      onClick={() => setLightboxImage({ src: img.imageUrl, title: img.title })}
    >
      <img src={img.imageUrl} alt={img.title} loading="lazy" />
      <div className={styles.imageOverlay}>
        <p>{img.title}</p>
      </div>
    </div>
  ))
)}
            </div>
          </div>

          {/* Videos Tab */}
          <div className={`${styles.tabContent} ${activeTab === "videos" ? styles.active : ""}`}>
            <div className={styles.videoGrid}>
              {videos.map((video, i) => {
                const shorts = isShorts(video.src);
                const isActive = activeVideo === i;
                return (
                  <div
                    key={i}
                    className={`${styles.videoCard} ${shorts ? styles.shortsCard : ""}`}
                  >
                    {isActive ? (
                      <>
                        <button
                          className={styles.closeBtn}
                          onClick={() => setActiveVideo(null)}
                          aria-label="إغلاق الفيديو"
                        >
                          ✕
                        </button>
                        <iframe
                          src={`${video.embedUrl}?autoplay=1&rel=0`}
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                          loading="lazy"
                          className={styles.videoIframe}
                          title={video.title}
                        />
                      </>
                    ) : (
                      <div
                        className={styles.videoThumbnail}
                        onClick={() => setActiveVideo(i)}
                      >
                        <img
                          src={video.thumbnail || "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop"}
                          alt={video.title}
                          loading="lazy"
                        />
                        <div className={styles.videoOverlay}>
                          <div className={styles.playBtn}>
                            <svg viewBox="0 0 24 24">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        </div>
                        <p className={styles.videoTitle}>{video.title}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox — images only */}
      {lightboxImage && (
        <div className={styles.lightbox} onClick={() => setLightboxImage(null)}>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
          <button className={styles.closeBtn} onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}>

            <X />
          </button>

            <img src={lightboxImage.src} alt={lightboxImage.title} />
            <p className={styles.lightboxTitle}>{lightboxImage.title}</p>
            
          </div>
          
            
        </div>
      )}

      {/* Replace with your <Footer /> component */}
      <Footer/>
    </div>
  );
}