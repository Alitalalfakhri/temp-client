"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../styles/reviews/reviews.module.css";
import Header from "../components/Header";
import Footer from "../components/footer";

export default function Reviews() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videoReviews = [
    {
      company: "شركة التغليف المتقدمة",
      role: "مدير المشتريات",
      rating: 5,
      comment: "جودة ممتازة وخدمة سريعة، نتعامل معهم منذ أكثر من 5 سنوات",
      videoId: "dQw4w9WgXcQ",
    },
    {
      company: "مصنع المواد الغذائية",
      role: "المدير العام",
      rating: 5,
      comment: "أفضل مصنع تعاملنا معه، التزام بالمواعيد والجودة",
      videoId: "dQw4w9WgXcQ",
    },
    {
      company: "سوبرماركت السالم",
      role: "مدير العمليات",
      rating: 5,
      comment: "أكياس متينة وطباعة احترافية",
      videoId: "dQw4w9WgXcQ",
    },
  ];

  const getThumbnail = (id) =>
    `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className={styles.page}>
        <Header/>
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>آراء العملاء</span>
          <h1>
            ماذا يقول <span className={styles.highlight}>عملاؤنا</span> عنا
          </h1>
          <p>نفخر بثقة عملائنا وشهاداتهم</p>
        </div>
      </section>

      <section className={styles.reviews}>
        <div className={styles.grid}>
          {videoReviews.map((review, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.videoWrapper}>
                {activeVideo === index ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${review.videoId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={styles.thumbnail}
                    onClick={() => setActiveVideo(index)}
                  >
                    <Image
                      src={getThumbnail(review.videoId)}
                      alt={review.company}
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
                <div className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.rating
                          ? styles.starActive
                          : styles.star
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className={styles.comment}>"{review.comment}"</p>

                <p className={styles.meta}>
                  {review.role} - {review.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}