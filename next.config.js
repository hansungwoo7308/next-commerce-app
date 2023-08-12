/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "upload.wikimedia.org",
    //     port: "",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
    domains: [
      "res.cloudinary.com",

      "www.usashop.co.kr",
      "source.unsplash.com",
      "shop-phinf.pstatic.net",
      "shopping-phinf.pstatic.net",
      "www.thecookierookie.com",
    ],
  },
};

module.exports = nextConfig;
