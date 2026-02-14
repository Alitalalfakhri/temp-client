import Header from "@/app/components/Header";
import Footer from "@/app/components/footer";
import {
  Award,
  Target,
  Eye,
  Users,
  CheckCircle2,
  MessageCircle 
} from "lucide-react";
import styles from "@/app/styles/about/main.module.css";

export default function About() {
 
  const values = [
    { icon: Award, title: "الجودة", description: "نلتزم بأعلى معايير الجودة في جميع منتجاتنا" },
    { icon: Target, title: "الابتكار", description: "نسعى دائماً لتطوير منتجات جديدة تلبي احتياجات السوق" },
    { icon: Eye, title: "الشفافية", description: "نتعامل بشفافية تامة مع عملائنا وشركائنا" },
    { icon: Users, title: "العمل الجماعي", description: "نؤمن بقوة العمل الجماعي لتحقيق النجاح" },
  ];

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.center}`}>
          <span className={styles.badge}>من نحن</span>
          <h1>
            قصة نجاح تمتد لأكثر من <span className={styles.highlight}>25 عاماً</span>
          </h1>
          <p>
            منذ تأسيس شركتنا   نسعى لتقديم أفضل حلول الأكياس البلاستيكية
          </p>
        </div>
      </section>

      {/* Story */}
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.grid2}`}>
          <div>
            <h2>من نحن</h2>
            <p>
                تعد شركة الطيف الذهبي رائدة في توفير حلول الطباعة والتغليف في العراق حيث تقوم بإنتاج مجموعة واسعة من أكياس النايلون
            </p>
            <p>
                مع أكثر من 30 سنة خبرة في مجال الطباعة والتغليف مجهزة بأحدث ما توصلت له التقنيات المتطورة في فن الطباعة والتغليف.
            </p>

            <ul className={styles.checklist}>
              <li><CheckCircle2 /> مجاز من قبل وزارة التجارة </li>
              <li><CheckCircle2 /> فريق خبراء متميز</li>
              <li><CheckCircle2 /> أحدث التقنيات</li>
              <li><CheckCircle2 /> صديقون للبيئة</li>
            </ul>
          </div>

          <div className={styles.imageBox}>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
              alt="المصنع"
            />
            <div className={styles.experience}>
              <strong>22+</strong>
              <span>سنة خبرة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={`${styles.section} ${styles.muted}`}>
        <div className={`${styles.container} ${styles.grid2}`}>
          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.primary}`}><Eye /></div>
            <h3>رؤيتنا</h3>
            <p>
                توفير أكياس نايلون ذات طباعة وتغليف عالية الجودة وتوفير الخدمات ذات الصلة لقاعدة عريضة من العملاء مع الاستفادة من التقنيات المبتكرة في بيئة الموظفين لبلوغ مكانة عالية في دعم وتعزيز الصناعة الوطنية.
            </p>
          </div>

          <div className={styles.card}>
            <div className={`${styles.icon} ${styles.primary}`}><MessageCircle  /></div>
            <h3>رسالتنا</h3>
            <p>
                تقديم الحلول المبتكرة للصناعات التحويلية المتنوعة من خلال كوادر بشرية مبدعة وعلاقات متميزة مع عملائنا وموردينا بالإضافة إلى تعزيز دور الشركة في المسؤولية الاجتماعية والمساهمة في تنمية الاقتصاد الوطني.
            </p>
          </div>
            <div className={`${styles.card} ${styles.goals}`}>
            <div className={`${styles.icon} ${styles.primary}`}><Target /></div>
            <h3>اهدافنا</h3>
            
                <ul>
                    <li>
                        توثيق علاقتنا بعملائنا.
                    </li>
                    
                    <li>
                        نرتقي بقدرتنا التنافسية وتطوير منتجاتنا والعمل على إيجاد منتجات حديثة من خلال البحث والتطوير.
                    </li>
                    <li>
                        الالتزام بدعم فريق العمل وتطويره واستقطاب وتطوير الكوادر البشرية المتميزة والمحافظة على استمراريتهم.
                    </li>
                </ul>
            
          </div>
        </div>
      </section>

      {/* Timeline */}
      
      {/* Values */}
      <section className={`${styles.section} ${styles.muted}`}>
        <div className={`${styles.container} ${styles.center}`}>
          <h2>
            قيمنا <span className={styles.highlight}>الأساسية</span>
          </h2>

          <div className={styles.values}>
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className={styles.valueCard}>
                  <div className={`${styles.icon} ${styles.primary}`}>
                    <Icon />
                  </div>
                  <h4>{v.title}</h4>
                  <p>{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
