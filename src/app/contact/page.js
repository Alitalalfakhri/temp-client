
import ContactCode from "./contact.js";

import { Suspense } from "react";



export default function Contact() {
  
  return(
     
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <ContactCode/>
    </Suspense>
      
    </>
  )
}