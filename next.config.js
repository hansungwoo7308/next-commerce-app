/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
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
    domains: ["res.cloudinary.com", "source.unsplash.com"],
  },
};

module.exports = nextConfig;
