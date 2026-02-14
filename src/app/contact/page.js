
import ContactClient from './contactClient'
import { Suspense } from "react";

export default function Contact() {
  return(

    <>
    <Suspense fallback={<div>Loading...</div>}>
      <ContactClient/>
    </Suspense>
      
    </>
  )
}