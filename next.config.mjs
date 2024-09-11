/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "capy-ton-test.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.telegram.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
