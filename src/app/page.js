import Header from "./components/Header";
import Hero from "./components/Hero.js";
import Stats from "./components/stats";
import ProductsSection from "./components/ProductsSection";
import WhyChooseUs from "./components/whyChooseUs";
import CtaSection  from "./components/CtaSection";
import Footer from "./components/footer";
export default function Home() {
  return (
    <div>
     <Header />
      <Hero />
      <Stats />
      <ProductsSection />
      <WhyChooseUs />
      <CtaSection />
      <Footer />
    </div>
  );
}
