/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ui-avatars.com"],
  },
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "https://chat-room-api-tau.vercel.app/socket.io/:path*",
      },
    ];
  },
};

export default nextConfig;
