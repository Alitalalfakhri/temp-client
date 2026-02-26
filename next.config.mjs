/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"], // أي دومين تستخدمه بالفعل
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",        // تركها فارغة
        pathname: "/vi/**", // كل thumbnails الفيديوهات
      },
    ],
  },
};

export default nextConfig;