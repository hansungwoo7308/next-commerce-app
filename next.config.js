/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  // environment variables
  env: {
    // mongodb
    MONGODB_URI: process.env.MONGODB_URI,
    // cloudinary (image upload)
    CLOUDINARY_NAME: "dzktdrw7o",
    CLOUDINARY_PRESET: "next_commerce_app_upload_preset",
    CLOUDINARY_API_BASE_URL: "https://api.cloudinary.com/v1_1/dzktdrw7o/upload",
    // next-auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
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
      "imagesvc.meredithcorp.io",
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       // source: "/:path*",
  //       source: "/api/:path*",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, PUT, DELETE, OPTIONS",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //         {
  //           key: "Access-Control-Allow-Credentials",
  //           value: "true",
  //         },
  //       ],
  //     },
  //   ];
  // },
};
module.exports = nextConfig;
