/** @type {import("next").NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [{ source: "/insights/reports", destination: "/insights/news", permanent: true }];
  },
};

export default nextConfig;
