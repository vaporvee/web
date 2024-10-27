import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
        protocol: "https",
      }
    ]
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL"
          },
        ]
      }
    ];
  },
};

export default nextConfig;
