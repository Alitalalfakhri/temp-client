
import ContactCode from "./contact.js";

import { Suspense } from "react";


export const metadata = {
  title: "تواصل معنا | شركة الطيف الذهبي للطباعة والتغليف",
  description:
    "راسل شركة الطيف الذهبي للطباعة والتغليف في العراق للاستفسار عن خدمات الطباعة والتغليف وطلب عرض سعر.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function Contact() {
  
  return(
     
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <ContactCode/>
    </Suspense>
      
    </>
  )
}