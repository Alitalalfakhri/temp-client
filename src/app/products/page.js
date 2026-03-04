import ProductsPage from "./product";

export const metadata = {
  title: "منتجاتنا | شركة الطيف الذهبي للطباعة والتغليف",
  description:
    "اكتشف منتجات شركة الطيف الذهبي للطباعة والتغليف، تشمل طباعة أكياس بلاستيكية، علاك سبلكس، علاك نايلون قبضة، وحلول تغليف بجودة عالية في العراق.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "أكياس بلاستيكية",
    "طباعة أكياس بلاستيكية",
    "علاك سبلكس",
    "علاك نايلون قبضة",
    "أسعار الأكياس البلاستيكية",
    "شركة طباعة في العراق"
  ],
};

export default function ProductList(){
  return(
    <ProductsPage/>
  
  )

};