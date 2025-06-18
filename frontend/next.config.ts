import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/app/cliente',
        destination: '/app/cliente/agendamento',
        permanent: true, // Use true for permanent redirects (SEO-friendly)
      },
      {
        source: '/app/barber',
        destination: '/app/barber/home',
        permanent: true,
      },
      {
        // temporario
        source: '/app',
        destination: '/auth/login',
        permanent: true
      }
    ];
  },
};

export default nextConfig;
