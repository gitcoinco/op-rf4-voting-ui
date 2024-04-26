/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "euc.li",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
