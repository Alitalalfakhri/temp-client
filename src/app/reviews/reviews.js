"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/reviews/reviews.module.css";
import Header from "../components/Header";
import Footer from "../components/footer";
import { API_URL } from "../lib/lib.js";
import axios from "axios";

export default function Reviews() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  // ---------------- FETCH VIDEOS ----------------
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/reviews/videos`);
      const data = res.data;
      console.log("Fetched videos:", data); // debug log
      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Reviews fetch error:", err);
      setVideos([]);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ---------------- GET VIDEO ID ----------------
  const getVideoIdFromUrl = (url) => {
    if (!url) return null;

    // youtu.be short link
    const shortMatch = url.match(/youtu\.be\/([^\?&]+)/);
    if (shortMatch) return shortMatch[1];

    // regular watch link
    const longMatch = url.match(/v=([^\?&]+)/);
    if (longMatch) return longMatch[1];

    // shorts link
    const shortsMatch = url.match(/\/shorts\/([^\?&]+)/);
    if (shortsMatch) return shortsMatch[1];

    return null;
  };

  // ---------------- GET THUMBNAIL ----------------
  const getThumbnail = (id) =>
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  return (
    <div className={styles.page}>
      <Header />

      {/* ---------------- HERO ---------------- */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>آراء العملاء</span>
          <h1>
            ماذا يقول <span className={styles.highlight}>عملاؤنا</span> عنا
          </h1>
          <p>نفخر بثقة عملائنا وشهاداتهم</p>
        </div>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <section className={styles.reviews}>
        <div className={styles.grid}>
          {videos.length === 0 && <p>لا توجد فيديوهات حالياً</p>}

          {videos.map((review, index) => {
            const videoId = review.videoId || getVideoIdFromUrl(review.videoUrl);
            if (!videoId) return <p key={index}>Video ID not found</p>;

            return (
              <div className={styles.card} key={index}>
                <div className={styles.videoWrapper}>
                  {activeVideo === index ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      loading="lazy"
                      className={styles.iframe}
                    />
                  ) : (
                    <div
                      className={styles.thumbnail}
                      onClick={() => setActiveVideo(index)}
                    >
                      <Image
                        src={getThumbnail(videoId)}
                        alt={review.company || "فيديو"}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className={styles.image}
                        priority={false}
                      />
                      <div className={styles.playBtn}>▶</div>
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  {/* Stars */}
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                       style={{color:"orange" , fontSize:"20px" , fontWeight:"bold" }}

                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Comment */}
                  {(review.comment || review.description) && (
                    <p className={styles.comment}>
                      "{review.comment || review.description}"
                    </p>
                  )}

                  {/* Role / Company */}
                  <p className={styles.meta}>
                    {review.role ? review.role : ""}
                    {review.role && review.company ? " - " : ""}
                    {review.company ? review.company : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}