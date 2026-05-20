   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     eslint: {
       ignoreDuringBuilds: true,
     },
     typescript: {
       ignoreBuildErrors: false, // Keep TS checking since you just fixed it
     },
   }
   
   export default nextConfig
