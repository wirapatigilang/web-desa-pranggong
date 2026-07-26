import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Default 1MB terlalu kecil untuk upload PDF landasan hukum (lihat
    // src/lib/actions/legal-basis.ts).
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
