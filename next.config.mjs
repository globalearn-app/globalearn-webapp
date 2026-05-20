/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

   const nextConfig = {
     eslint: {
       ignoreDuringBuilds: true,
     },
   }
   
   export default nextConfig