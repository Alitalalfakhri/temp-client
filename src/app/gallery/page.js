import Gallery from "./gallery";

export const metadata = {
    title:"معرض اعمالنا | شركة الطيف الذهبي للطباعة والتغليف",
    description:"تعرف على مختلف انواع الاكياس البلاستيكة وانظر الى اعمالنا السابقةة",
    robots: {
      index: true,
      follow: true,
    },
}
export default function Page() {
  return <Gallery />;
}