import ReviewsCode from "./reviews";


export const metadata = {
  title: "اراء العملاء",
  description:"جزء من اراء عملاء شركة الطيف الذهبي",
  robots: {
    index: true,
    follow: true,
  },
};
export default function Reviews(){
  return(
    <ReviewsCode/>
  )

}